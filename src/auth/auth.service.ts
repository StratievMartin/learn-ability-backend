import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { SignInDto, SignUpDto } from './dto'
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
// import { User, Course } from '@prisma/client'

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}
  async signin(dto: SignInDto): Promise<{ access_token: string }> {
    // find the user by email
    const { email, password } = dto
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
    // if !user throw exc
    if (!user) throw new ForbiddenException('Incorrect Credentials')

    // compare pass
    const pwMatches = await argon.verify(user.passwordHash, password)
    // if pass incorrect throw exc
    if (!pwMatches) throw new ForbiddenException('Incorrect Credentials')
    // send user
    return this.signToken(user.id, user.email)
  }
  async signup(dto: SignUpDto): Promise<{ access_token: string }> {
    const { email, password, firstName, lastName } = dto
    // gen the pass hash
    const passwordHash = await argon.hash(password)
    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          passwordHash,
          firstName,
          lastName,
        },
      })

      return this.signToken(user.id, user.email)
    } catch (error) {
      // if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Email is already taken.')
      }
      throw error
    }
  }
  async signToken(userId: number, email: string) {
    const payload = { sub: userId, email }

    const secret = this.config.get('JWT_SECRET')
    const expiresIn = '15m'
    const options = {
      expiresIn,
      secret,
    }
    const token = await this.jwt.signAsync(payload, options)

    return {
      access_token: token,
    }
  }
}
