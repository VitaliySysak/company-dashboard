// import { prisma } from './prisma-client';
// import { hashSync } from 'bcrypt';
// import { UserRole } from '@prisma/client';
// import { v4 as uuid } from 'uuid';
// import { JwtService, JwtSignOptions } from '@nestjs/jwt';

// const jwtService = new JwtService();

// const { COOKIE_EXPIRE_MS, JWT_SECRET, JWT_REFRESH_EXPIRE_IN } = process.env;
// const cookieExpTime = parseInt(COOKIE_EXPIRE_MS!);

// const refreshOptions: JwtSignOptions = {
//   secret: process.env.JWT_SECRET!,
//   expiresIn: process.env.JWT_REFRESH_EXPIRE_IN || '7d',
// };

// async function up() {
//   const userId = uuid();
//   const adminId = uuid();
//   const superAdminId = uuid();

//   await prisma.user.createMany({
//     data: [
//       {
//         id: userId,
//         fullName: 'User',
//         email: 'user@test.com',
//         avatarUrl: 'qwei',
//         password: hashSync('12345678', 10),
//       },
//       {
//         id: adminId,
//         fullName: 'Admin',
//         email: 'admin@test.com',
//         avatarUrl: 'qwei',
//         role: UserRole.ADMIN,
//         password: hashSync('12345678', 10),
//       },
//       {
//         id: superAdminId,
//         fullName: 'SuperAdmin',
//         email: 'superadmin@test.com',
//         avatarUrl: 'qwei',
//         role: UserRole.SUPER_ADMIN,
//         password: hashSync('12345678', 10),
//       },
//     ],
//   });

//   await prisma.company.createMany({
//     data: [
//       {
//         name: 'company 1',
//         capital: 100000,
//         details: 'some company',
//         service: 'IT',
//         logoUrl: 'url 1',
//         userId: userId,
//       },
//       {
//         name: 'company 2',
//         capital: 100000,
//         details: 'some company',
//         service: 'Sience',
//         logoUrl: 'url 2',
//         userId: adminId,
//       },
//       {
//         name: 'company 3',
//         capital: 100000,
//         details: 'some company',
//         service: 'Bank',
//         logoUrl: 'url 3',
//         userId: superAdminId,
//       },
//     ],
//   });

//   await prisma.userSession.createMany({
//     data: [
//       {
//         refreshToken: jwtService.sign({ sub: userId }, refreshOptions),
//         expiresAt: new Date(Date.now() + cookieExpTime),
//         userId: userId,
//       },
//       {
//         refreshToken: jwtService.sign({ sub: adminId }, refreshOptions),
//         expiresAt: new Date(Date.now() + cookieExpTime),
//         userId: adminId,
//       },
//       {
//         refreshToken: jwtService.sign({ sub: superAdminId }, refreshOptions),
//         expiresAt: new Date(Date.now() + cookieExpTime),
//         userId: superAdminId,
//       },
//     ],
//   });
// }

// async function down() {
//   await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
//   await prisma.$executeRaw`TRUNCATE TABLE "Company" RESTART IDENTITY CASCADE`;
//   await prisma.$executeRaw`TRUNCATE TABLE "UserSession" RESTART IDENTITY CASCADE`;
// }

// async function main() {
//   try {
//     await down();
//     await up();
//   } catch (e) {
//     console.error(e);
//   }
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
