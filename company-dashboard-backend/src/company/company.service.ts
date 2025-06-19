import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { Action } from '@prisma/client';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { GetCompaniesDto } from './dto/get-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserCompany(companyId: string, userId: string) {
    const company = await this.prisma.company.findFirst({ where: { id: companyId } });

    return company;
  }

  async getUserCompanies(query: GetCompaniesDto, userId: string) {
    const {
      createdAtFrom,
      createdAtTo,
      capitalMin,
      capitalMax,
      sortBy = 'name',
      sortOrder = 'asc',
      skip,
      limit,
    } = query;

    const where: Record<string, any> = { userId };

    const createdAtFilter: Record<string, Date> = {};
    if (createdAtFrom) createdAtFilter.gte = new Date(createdAtFrom);
    if (createdAtTo) createdAtFilter.lte = new Date(createdAtTo);
    if (Object.keys(createdAtFilter).length) where.createdAt = createdAtFilter;

    const capitalFilter: Record<string, number> = {};
    if (capitalMin) capitalFilter.gte = capitalMin;
    if (capitalMax) capitalFilter.lte = capitalMax;
    if (Object.keys(capitalFilter).length) where.capital = capitalFilter;

    const [companies, totalCount] = await Promise.all([
      this.prisma.company.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
      }),
      this.prisma.company.count({ where }),
    ]);

    return { companies, totalCount };
  }

  async getAdminCompanies() {
    const allCompanies = await this.prisma.company.findMany();

    return allCompanies;
  }

  async createUserCompany(newCompany: CreateCompanyDTO, userId: string) {
    const { name, service, details, capital, logoUrl, lat, lng } = newCompany;

    const isCompanyExist = await this.prisma.company.findFirst({
      where: {
        name,
        userId,
      },
    });

    if (isCompanyExist) {
      throw new BadRequestException(`Company with name ${name} already exists`);
    }

    await this.prisma.log.create({
      data: {
        userId,
        action: Action.CREATE,
      },
    });

    const company = await this.prisma.company.create({
      data: {
        name,
        service,
        details,
        lat,
        lng,
        capital,
        logoUrl,
        userId,
      },
    });

    return company;
  }

  async updateCompanyById(id: string, updateCompany: UpdateCompanyDto, userId: string) {
    const company = await this.prisma.company.findFirst({ where: { id } });
    if (!company) {
      throw new BadRequestException(`Company with id ${id} not found`);
    }

    await this.prisma.log.create({
      data: {
        userId,
        action: Action.UPDATE,
      },
    });

    return this.prisma.company.update({ where: { id }, data: updateCompany });
  }

  async deleteCompanyById(id: string, userId: string) {
    const company = await this.prisma.company.findFirst({ where: { id, userId } });
    if (!company) {
      throw new BadRequestException(`Company with id ${id} not found`);
    }

    await this.prisma.log.create({
      data: {
        userId,
        action: Action.DELETE,
      },
    });

    const deletedCompany = await this.prisma.company.delete({ where: { id } });

    return deletedCompany;
  }

  async deleteAdminCompanyById(id: string, userId: string) {
    const company = await this.prisma.company.findFirst({ where: { id } });
    if (!company) {
      throw new BadRequestException(`Company with id ${id} not found`);
    }

    await this.prisma.log.create({
      data: {
        userId,
        action: Action.DELETE,
      },
    });

    const deletedCompany = await this.prisma.company.delete({ where: { id } });

    return deletedCompany;
  }
}
