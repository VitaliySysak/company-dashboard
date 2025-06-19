import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthJwtPayload } from '../types/auth-jwt-payload';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { accessJwtConfig, accessJwtConfigKey } from '../config/access-jwt.config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(Strategy, 'access-jwt') {
  constructor(
    @Inject(accessJwtConfigKey) private accessJwtConfiguration: ConfigType<typeof accessJwtConfig>,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: accessJwtConfiguration.secret!,
      ignoreExpiration: false,
    });
  }

  async validate(payload: AuthJwtPayload) {
    const user = await this.prisma.user.findFirst({ where: { id: payload.sub } });

    if (!user) {
      throw new UnauthorizedException('User not found!');
    }

    return { id: user.id, role: user.role };
  }
}
