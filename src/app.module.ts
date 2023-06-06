import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { CourseModule } from './course/course.module'
import { PrismaModule } from './prisma/prisma.module'
import { KeywordModule } from './keyword/keyword.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    CourseModule,
    PrismaModule,
    KeywordModule,
  ],
})
export class AppModule {}
