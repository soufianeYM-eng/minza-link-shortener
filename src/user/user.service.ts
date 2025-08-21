import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  createUser(createUserPayload: Prisma.UserCreateInput) {
    const { username, password, ...rest } = createUserPayload;
    return this.prisma.user.create({
      data: { username, password, profile: { create: rest } },
      omit: { password: true },
    });
  }

  findAllUsers() {
    return this.prisma.user.findMany({ include: { profile: true } });
  }

  findUserByUsername(username: string) {
    return this.prisma.user.findFirst({
      where: { username },
      include: { profile: true },
    });
  }
}
