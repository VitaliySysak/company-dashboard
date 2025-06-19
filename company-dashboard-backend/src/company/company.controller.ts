import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  InternalServerErrorException,
  BadRequestException,
  UseGuards,
  Query,
} from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { Request } from 'express';
import { CompanyService } from './company.service';
import { AccessAuthGuard } from 'src/auth/guards/access-jwt-auth/access-jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { GetCompaniesDto } from './dto/get-company.dto';

@Controller({ path: '/company' })
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(AccessAuthGuard)
  @Get('/:id')
  async getUserCompany(@Param('id') companyId, @Req() req: Request & { user: User }) {
    try {
      const userId = req.user.id;

      const company = await this.companyService.getUserCompany(companyId, userId);

      return company;
    } catch (error) {
      console.error('Error while execution Company.controller/getUserCompanies:', error);
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AccessAuthGuard)
  @Get('/')
  async getUserCompanies(@Req() req: Request & { user: User }, @Query() query: GetCompaniesDto) {
    try {
      const userId = req.user.id;

      const usersCompanies = await this.companyService.getUserCompanies(query, userId);

      return usersCompanies;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      console.error('Error while execution Company.controller/getUserCompanies:', error);
      throw new InternalServerErrorException();
    }
  }

  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AccessAuthGuard)
  @Get('/admin')
  async getAdminCompanies() {
    try {
      const allCompanies = await this.companyService.getAdminCompanies();

      return allCompanies;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      console.error('Error while execution Company.controller/getAdminCompanies:', error);
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AccessAuthGuard)
  @Post('/')
  async createUserCompany(@Body() body: CreateCompanyDTO, @Req() req: Request & { user: User }) {
    try {
      const userId = req.user.id;

      const company = await this.companyService.createUserCompany(body, userId);

      return company;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      console.error('Error while execution Company.controller/createUserCompany:', error);
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AccessAuthGuard)
  @Put(':id')
  async updateCompanyById(@Param('id') id, @Req() req: Request & { user: User }, @Body() body: UpdateCompanyDto) {
    try {
      const userId = req.user.id;

      const updatedCompany = await this.companyService.updateCompanyById(id, body, userId);

      return updatedCompany;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      console.error('Error while execution Company.controller/updateCompanyById:', error);
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AccessAuthGuard)
  @Delete(':id')
  async deleteCompanyById(@Param('id') id: string, @Req() req: Request & { user: User }) {
    try {
      const userId = req.user.id;

      const deletedCompany = await this.companyService.deleteCompanyById(id, userId);

      return deletedCompany;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      console.error('Error while execution Company.controller/deleteCompanyById:', error);
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AccessAuthGuard)
  @Delete('admin/:id')
  async deleteAdminCompanyById(@Param('id') id: string, @Req() req: Request & { user: User }) {
    try {
      const userId = req.user.id;

      const deletedCompany = await this.companyService.deleteAdminCompanyById(id, userId);

      return deletedCompany;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      console.error('Error while execution Company.controller/deleteCompanyById:', error);
      throw new InternalServerErrorException();
    }
  }
}
