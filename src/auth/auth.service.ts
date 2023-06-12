import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { SignInDto, SignUpDto } from './dto'
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Tokens } from './types'

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  async signIn(dto: SignInDto) {
    const { email, password } = dto
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) throw new ForbiddenException('Incorrect Credentials')

    const pwMatches = await argon.verify(user.passwordHash, password)

    if (!pwMatches) throw new ForbiddenException('Incorrect Credentials')

    const tokens = await this.getTokens(user.id, user.email)
    await this.updateRtHash(user.id, tokens.refresh_token)

    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      tokens,
    }
  }

  async signUp(dto: SignUpDto) {
    const { email, password, firstName, lastName } = dto

    const passwordHash = await argon.hash(password)

    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          passwordHash,
          firstName,
          lastName,
        },
      })

      const tokens = await this.getTokens(user.id, user.email)
      await this.updateRtHash(user.id, tokens.refresh_token)

      return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        tokens,
      }
    } catch (error) {
      // if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Email is already taken.')
      }
      throw error
    }
  }

  async signOut(userId: number): Promise<void> {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        rtHash: {
          not: null,
        },
      },
      data: {
        rtHash: null,
      },
    })
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (!user || !user.rtHash) throw new ForbiddenException('Access Denied')

    const rtMatches = await argon.verify(user.rtHash, refreshToken)

    if (!rtMatches) throw new ForbiddenException('Access Denied')

    const tokens = await this.getTokens(userId, user.email)

    await this.updateRtHash(user.id, tokens.refresh_token)

    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      tokens,
    }
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const payload = { sub: userId, email }

    const at_secret = this.config.get('AT_SECRET')
    const rt_secret = this.config.get('RT_SECRET')

    const atOptions = {
      expiresIn: '15m',
      secret: at_secret,
    }
    const rtOptions = {
      expiresIn: 60 * 60 * 24 * 7 * 4, // 4 weeks
      secret: rt_secret,
    }

    const [access_token, refresh_token] = await Promise.all([
      this.jwt.signAsync(payload, atOptions),
      this.jwt.signAsync(payload, rtOptions),
    ])

    return {
      access_token,
      refresh_token,
    }
  }

  async updateRtHash(userId: number, rt: string) {
    const rtHash = await argon.hash(rt)
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        rtHash: rtHash,
      },
    })
  }
}
