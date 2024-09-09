import { AuthDto, SingupAuthDto } from './dto/auth.dto';
import { RtGuard } from '../../common/guards/rt.guard';
import { AuthResponse, RegisterResponse, Tokens } from './types/auth.types';
import { Public } from '../../common/guards/decorators/public.decorator';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetCurrentUserId } from '../../common/guards/decorators/getCurrentUserId.decorator';
import { GetCurrentUser } from '../../common/guards/decorators/getCurrentUser.decorator';
import { AtGuard } from '../../common/guards/at.guard';
import { UserResponse } from './dto/user.dto';

@Controller('/')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: AuthDto): Promise<AuthResponse> {
    return this.authService.signinLocal(dto);
  }

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: SingupAuthDto): Promise<RegisterResponse> {
    return this.authService.signupLocal(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string): Promise<boolean> {
    return this.authService.logout(userId);
  }

  // @UseGuards(AtGuard)
  // @Get('/me')
  // getMe(@GetCurrentUserId() userId: string):Promise<UserResponse>{
  //   return this.authService.get
  // }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<AuthResponse> {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Post('validate')
  @UseGuards(AtGuard)
  validateToken(@GetCurrentUserId() userId: string): Promise<UserResponse> {
    return this.authService.validateAccessTokenAndGetUser(userId); // If the guard passes, the token is valid
  }
}
