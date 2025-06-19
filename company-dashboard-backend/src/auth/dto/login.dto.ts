import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsEmail, IsNumber, IsDate } from '@nestjs/class-validator';

export class LoginDto {
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

export class LoginResponseDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
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
