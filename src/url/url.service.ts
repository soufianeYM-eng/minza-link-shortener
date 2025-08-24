import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateUrlDto from './dtos/create-url.dto';
import { generateShortUid } from 'src/common/helpers/url.helper';

@Injectable()
export class UrlService {
  constructor(private readonly prisma: PrismaService) {}

  findAllUrls(id: string) {
    return this.prisma.url.findMany({ where: { userId: id } });
  }

  async createUrl(id: string, createUrlPayload: CreateUrlDto) {
    const { expirationDate, long } = createUrlPayload;
    if (expirationDate < Date.now().toString()) {
      throw new BadRequestException('Invalid Expiration Date!');
    }
    let generatedShortUid = generateShortUid(id, long);
    let checkShortUidExistence = await this.prisma.url.findUnique({
      where: { shortUid: generatedShortUid },
    });

    // Generate shortUid
    while (checkShortUidExistence) {
      generatedShortUid = generateShortUid(id, long);

      checkShortUidExistence = await this.prisma.url.findUnique({
        where: { shortUid: generatedShortUid },
      });
    }

    // Create Url
    return this.prisma.url.create({
      data: { ...createUrlPayload, shortUid: generatedShortUid, userId: id },
    });
  }
}
