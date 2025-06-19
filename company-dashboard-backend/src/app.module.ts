import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { UserAuthorizationMiddleware } from './middleware/userAuthorization.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { LogModule } from './log/log.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET!,
      signOptions: {
        expiresIn: process.env.JWT_ACCESS_EXPIRE_IN,
      },
    }),
    AuthModule,
    UserModule,
    CompanyModule,
    HealthModule,
    LogModule,
  ],
  providers: [UserAuthorizationMiddleware],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAuthorizationMiddleware).forRoutes();
  }
}
