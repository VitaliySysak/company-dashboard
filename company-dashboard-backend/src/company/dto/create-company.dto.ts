import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsEmail, IsNumber, IsDate } from '@nestjs/class-validator';
import { IsOptional } from 'class-validator';

export class CreateCompanyDTO {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  service: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  details: string;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsNumber()
  lat?: number;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsNumber()
  lng?: number;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  @IsNotEmpty()
  capital: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  logoUrl?: string;
}
