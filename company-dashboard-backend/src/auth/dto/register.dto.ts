import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsEmail, IsNumber } from '@nestjs/class-validator';
import { Optional } from '@nestjs/common';

export class RegisterDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, required: false })
  @Optional()
  avatarUrl?: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class RegisterReturnDto {
  @ApiProperty({ type: String, required: true })
  @IsNumber()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}

export class RegisterResponseDto {
  @ApiProperty({ type: String, required: true })
  @IsNumber()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
