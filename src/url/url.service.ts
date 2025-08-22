import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UrlService {
  constructor(private readonly prisma: PrismaService) {}

  findAllUrls(id: string) {
    return this.prisma.url.findMany({ where: { userId: id } });
  }
}
