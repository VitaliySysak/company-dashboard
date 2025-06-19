import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CompanyService } from './company.service';

@Module({
  imports: [PrismaModule],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
