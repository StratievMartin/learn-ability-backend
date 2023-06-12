import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { CourseModule } from './course/course.module'
import { PrismaModule } from './prisma/prisma.module'
import { KeywordModule } from './keyword/keyword.module'
import { APP_GUARD } from '@nestjs/core'
import { AtGuard } from './auth/guard'

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
  providers:[
    {
      provide: APP_GUARD,
      useClass: AtGuard
    }
  ]
})
export class AppModule {}
