import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserRole } from '@prisma/client';
import { AccessAuthGuard } from 'src/auth/guards/access-jwt-auth/access-jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(UserRole.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AccessAuthGuard)
  @Get('/super-admin/one/:id')
  async getUser(@Param('id') id: string) {
    try {
      const user = await this.userService.getUser(id);

      return user;
    } catch (error) {
      console.error('Error while execution user.controller/getAll:', error);
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AccessAuthGuard)
  @Get('/profile')
  async getProfile(@Req() req: Request & { user: User }) {
    try {
      const userId = req.user.id;

      const profile = await this.userService.getProfile(userId);

      return profile;
    } catch (error) {
      console.error('Error while execution user.controller/getAll:', error);
      throw new InternalServerErrorException();
    }
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AccessAuthGuard)
  @Get('/admin/all')
  async getAdminAll() {
    try {
      const allUsers = await this.userService.getAdminAll();

      return allUsers;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      console.error('Error while execution user.controller/getAll:', error);
      throw new InternalServerErrorException();
    }
  }

  @Roles(UserRole.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AccessAuthGuard)
  @Get('/super-admin/all')
  async getSuperAdminAll() {
    try {
      const allUsers = await this.userService.getSuperAdminAll();

      return allUsers;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      console.error('Error while execution user.controller/getAll:', error);
      throw new InternalServerErrorException();
    }
  }

  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AccessAuthGuard)
  @Delete('/admin/:id')
  async adminDelete(@Param('id') id) {
    try {
      const deletedUser = await this.userService.adminDelete(id);

      return deletedUser;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      console.error('Error while execution user.controller/getAll:', error);
      throw new InternalServerErrorException();
    }
  }

  @Roles(UserRole.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AccessAuthGuard)
  @Delete('/super-admin/:id')
  async superAdminDelete(@Param('id') id: string) {
    try {
      const deletedUser = await this.userService.superAdminDelete(id);

      return deletedUser;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      console.error('Error while execution user.controller/getAll:', error);
      throw new InternalServerErrorException();
    }
  }
}
