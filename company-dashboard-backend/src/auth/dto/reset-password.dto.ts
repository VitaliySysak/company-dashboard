import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsEmail, IsNumber, IsDate } from '@nestjs/class-validator';

export class ResetPasswordDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
