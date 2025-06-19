import { UserService } from './../user/user.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { refreshJwtConfig } from './config/refresh-jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { CompanyModule } from 'src/company/company.module';
import { accessJwtConfig } from './config/access-jwt.config';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { AccessJwtStrategy } from './strategies/access-jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    CompanyModule,
    JwtModule.registerAsync(refreshJwtConfig.asProvider()),
    ConfigModule.forFeature(refreshJwtConfig),
    ConfigModule.forFeature(accessJwtConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, RefreshJwtStrategy, AccessJwtStrategy],
})
export class AuthModule {}
