import { BadRequestException, Injectable } from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    const user = this.prisma.user.findFirst({ where: { email } });

    return user;
  }

  async getUser(id: string) {
    const user = await this.prisma.user.findFirst({ where: { id } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async getProfile(id: string) {
    const profile = await this.prisma.user.findFirst({ where: { id } });

    if (!profile) {
      throw new BadRequestException('User profile not found');
    }

    return profile;
  }

  async getAdminAll() {
    const allUsers = await this.prisma.user.findMany({
      where: {
        role: {
          in: [UserRole.ADMIN, UserRole.USER],
        },
      },
    });

    return allUsers;
  }

  async getSuperAdminAll() {
    const allUsers = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true,
      },
    });

    return allUsers;
  }

  async adminDelete(userId: string) {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });

    if (user?.role !== UserRole.USER) {
      throw new BadRequestException('You do not have right permission');
    }

    await this.prisma.log.deleteMany({ where: { userId } });
    await this.prisma.userSession.deleteMany({ where: { userId } });
    await this.prisma.company.deleteMany({ where: { userId } });
    const deletedUser = await this.prisma.user.delete({
      where: { id: userId, role: { in: [UserRole.USER] } },
    });

    return deletedUser;
  }

  async superAdminDelete(userId: string) {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });

    if (user?.role === UserRole.SUPER_ADMIN) {
      throw new BadRequestException('You do not have right permission');
    }

    await this.prisma.log.deleteMany({ where: { userId } });
    await this.prisma.userSession.deleteMany({ where: { userId } });
    await this.prisma.company.deleteMany({ where: { userId } });
    const deletedUser = await this.prisma.user.delete({
      where: { id: userId, role: { in: [UserRole.USER, UserRole.ADMIN] } },
    });

    return deletedUser;
  }
}
