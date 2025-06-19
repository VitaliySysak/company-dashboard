import { UserService } from './../user/user.service';
import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, UserRole } from '@prisma/client';
import { RegisterDto, RegisterResponseDto, RegisterReturnDto } from 'src/auth/dto/register.dto';
import { LoginDto, LoginResponseDto } from 'src/auth/dto/login.dto';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { refreshJwtConfig, refreshJwtConfigKey } from './config/refresh-jwt.config';
import { accessJwtConfig, accessJwtConfigKey } from './config/access-jwt.config';
import { AuthJwtPayload } from './types/auth-jwt-payload';
import * as argon2 from 'argon2';

const { COOKIE_EXPIRE_MS, SUPER_ADMIN_PASSWORD } = process.env;
const cookieExpTime = parseInt(COOKIE_EXPIRE_MS!);

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfigKey)
    private readonly refreshConfig: ConfigType<typeof refreshJwtConfig>,
    @Inject(accessJwtConfigKey)
    private readonly accessConfig: ConfigType<typeof accessJwtConfig>,
  ) {}

  async findSession(refreshToken: string, userId: string) {
    const sessions = await this.prisma.userSession.findMany({
      where: { userId },
    });

    const session = await Promise.any(
      sessions.map(async (session) =>
        (await argon2.verify(session.hashedRefreshToken, refreshToken)) ? session : Promise.reject(),
      ),
    ).catch(() => {
      throw new BadRequestException('Invalid refresh token');
    });

    return session;
  }

  async generateTokens(userId: string) {
    const payload: AuthJwtPayload = { sub: userId };

    const [refreshToken, accessToken] = await Promise.all([
      this.jwtService.signAsync(payload, this.refreshConfig),
      this.jwtService.signAsync(payload, this.accessConfig),
    ]);

    return { refreshToken, accessToken };
  }

  async updateHashedRefreshToken(sessionId: string, hashedRefreshToken: string) {
    return await this.prisma.userSession.update({
      where: { id: sessionId },
      data: {
        hashedRefreshToken,
      },
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { userId: user.id, userRole: user.role };
  }

  async register(newUser: RegisterDto) {
    const { fullName, email, avatarUrl, password } = newUser;

    const isUserExist = await this.userService.findByEmail(email);

    if (isUserExist) {
      throw new BadRequestException(`User with email ${email} already exists`);
    }

    const hashedPassword = await hash(password, 10);

    let user: User;

    if (password === SUPER_ADMIN_PASSWORD) {
      user = await this.prisma.user.create({
        data: {
          fullName,
          email,
          avatarUrl,
          password: hashedPassword,
          role: UserRole.SUPER_ADMIN,
        },
      });
    } else {
      user = await this.prisma.user.create({
        data: {
          fullName,
          email,
          avatarUrl,
          password: hashedPassword,
        },
      });
    }

    const { refreshToken, accessToken } = await this.generateTokens(user.id);
    const hashedRefreshToken = await argon2.hash(refreshToken);

    await this.prisma.userSession.create({
      data: {
        userId: user.id,
        hashedRefreshToken,
        expiresAt: new Date(Date.now() + cookieExpTime),
      },
    });

    return {
      id: user.id,
      refreshToken,
      accessToken,
      role: user.role,
    };
  }

  async login(user: LoginDto) {
    const { email, password } = user;
    const { userId, userRole } = await this.validateUser(email, password);

    const { refreshToken, accessToken } = await this.generateTokens(userId);
    const hashedRefreshToken = await argon2.hash(refreshToken);

    await this.prisma.userSession.create({
      data: {
        userId,
        hashedRefreshToken,
        expiresAt: new Date(Date.now() + cookieExpTime),
      },
    });

    return {
      id: userId,
      accessToken,
      refreshToken,
      role: userRole,
    };
  }

  async logout(refreshToken: string, userId: string) {
    const session = await this.findSession(refreshToken, userId);

    await this.prisma.userSession.delete({ where: { id: session.id } });
  }

  async refreshToken(token: string, userId: string) {
    const session = await this.findSession(token, userId);

    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const hashedRefreshToken = await argon2.hash(refreshToken);

    const user = await this.prisma.user.findFirst({ where: { id: session.userId } });

    if (!user) {
      throw new BadRequestException('User not found!');
    }

    await this.prisma.userSession.update({
      where: { id: session.id },
      data: {
        hashedRefreshToken,
        expiresAt: new Date(Date.now() + cookieExpTime),
      },
    });

    return {
      id: userId,
      accessToken,
      refreshToken,
      role: user.role,
    };
  }

  async resetPassword(newUser: LoginDto) {
    const { email, password } = newUser;

    const hashedPassword = await hash(password, 10);

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found!');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    });

    return {
      id: updatedUser.id,
    };
  }
}
