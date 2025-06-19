import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { refreshJwtConfig, refreshJwtConfigKey } from '../config/refresh-jwt.config';
import { AuthJwtPayload } from '../types/auth-jwt-payload';
import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';

const cookieExtractor = (req: Request): string | null => {
  if (req.cookies.refreshToken) {
    return req.cookies.refreshToken;
  }
  return null;
};

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(@Inject(refreshJwtConfigKey) private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: refreshJwtConfiguration.secret!,
      passReqToCallback: true,
      ignoreExpiration: false,
    });
  }

  validate(req: Request, payload: AuthJwtPayload) {
    const refreshToken = cookieExtractor(req);

    return { id: payload.sub, refreshToken };
  }
}
