import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { SignInDto, SignUpDto } from './dto'
import * as argon from 'argon2'
// import { User, Course } from '@prisma/client'

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signin(dto: SignInDto) {
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
    delete user.passwordHash
    return user
  }
  async signup(dto: SignUpDto) {
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
      delete user.passwordHash

      return user
    } catch (error) {
      // if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Email is already taken.')
      }
      throw error
    }
  }
}
