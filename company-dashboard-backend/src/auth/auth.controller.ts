import {
  Controller,
  Post,
  Body,
  BadRequestException,
  InternalServerErrorException,
  Req,
  Res,
  Get,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { CookieOptions } from 'src/auth/types/cookie';
import { RefreshAuthGuard } from './guards/refresh-jwt-auth/refresh-jwt-auth.guard';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';

const { BACKEND_ROUTE, REFRESH_TOKEN_NAME, COOKIE_EXPIRE_MS, FRONTEND_URL } = process.env;

const cookieExpTime = parseInt(COOKIE_EXPIRE_MS!);
const isProd = process.env.NODE_ENV === 'production';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: 'lax',
  maxAge: cookieExpTime,
  path: BACKEND_ROUTE + '/',
};

@Controller({ path: '/auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() body: RegisterDto, @Res({ passthrough: true }) res: Response) {
    try {
      const { id, refreshToken, accessToken, role } = await this.authService.register(body);

      res.cookie(REFRESH_TOKEN_NAME!, refreshToken, cookieOptions);

      return { id, accessToken, role };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      } else if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      }
      console.error('Error while execution user.controller/register:', error);
      throw new InternalServerErrorException();
    }
  }

  @Post('/login')
  async login(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response) {
    try {
      const { id, refreshToken, accessToken, role } = await this.authService.login(body);

      res.cookie(REFRESH_TOKEN_NAME!, refreshToken, cookieOptions);

      return { id, accessToken, role };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      } else if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      }
      console.error('Error while execution user.controller/login:', error);
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(RefreshAuthGuard)
  @Post('/logout')
  async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
    const userId = req.user.id;
    const refreshToken = req.user.refreshToken;

    await this.authService.logout(refreshToken, userId);

    res.clearCookie(REFRESH_TOKEN_NAME!, cookieOptions);

    return { message: 'Logged out successfully' };
  }

  @UseGuards(RefreshAuthGuard)
  @Post('/refresh')
  async refreshToken(@Req() req, @Res({ passthrough: true }) res: Response) {
    try {
      const userId = req.user.id;
      const reqRefreshToken = req.user.refreshToken;

      const { id, refreshToken, accessToken, role } = await this.authService.refreshToken(reqRefreshToken, userId);

      res.cookie(REFRESH_TOKEN_NAME!, refreshToken, cookieOptions);

      return { id, accessToken, role };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      console.error('Error while execution auth.controller.ts:', error);
    }
  }

  @Post('/reset-password')
  async resetPassword(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response) {
    try {
      const id = await this.authService.resetPassword(body);

      return { id };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      } else if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      }
      console.error('Error while execution user.controller/login:', error);
      throw new InternalServerErrorException();
    }
  }
}
