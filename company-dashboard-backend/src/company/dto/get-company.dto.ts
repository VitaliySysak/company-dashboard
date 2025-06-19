import { IsOptional, IsString, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class GetCompaniesDto {
  @IsOptional()
  @IsDateString()
  createdAtFrom?: string;

  @IsOptional()
  @IsDateString()
  createdAtTo?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  capitalMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  capitalMax?: number;

  @IsOptional()
  @IsString()
  sortBy?: 'name' | 'service';

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  skip?: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number = 9;
}
