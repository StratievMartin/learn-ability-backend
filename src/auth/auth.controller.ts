import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Post,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto, SignUpDto } from './dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto)
  }
  @Post('signUp')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto)
  }
}
