import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { GetUser, GetUserId, Public } from './decorator';
import { RtGuard } from './guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('signIn')
    @HttpCode(HttpStatus.OK)
    signIn(@Body() dto: SignInDto) {
        return this.authService.signIn(dto);
    }

    @Public()
    @Post('signUp')
    @HttpCode(HttpStatus.CREATED)
    signUp(@Body() dto: SignUpDto) {
        return this.authService.signUp(dto);
    }

    @Post('signOut')
    @HttpCode(HttpStatus.OK)
    signOut(@GetUserId() userId: number) {
        return this.authService.signOut(userId);
    }

    @Public()
    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(
        @GetUserId() userId: number,
        @GetUser('refreshToken') refreshToken: string
    ) {
        return this.authService.refreshTokens(userId, refreshToken);
    }
}
