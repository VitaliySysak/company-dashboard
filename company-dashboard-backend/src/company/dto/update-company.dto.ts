import { ApiProperty } from '@nestjs/swagger';
import { IsString } from '@nestjs/class-validator';

export class UpdateCompanyDto {
  @ApiProperty({ type: String })
  @IsString()
  details: string;
}
