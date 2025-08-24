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

    // #region Parse date from string to dateTime ISO
    const parsed = new Date(expirationDate);
    if (isNaN(parsed.getTime())) {
      throw new BadRequestException(
        'Invalid date format. Must be ISO-8601 or timestamp.',
      );
    }
    // #endregion

    // #region Verify if date bigger than now dates
    if (parsed.getTime() < Date.now()) {
      throw new BadRequestException('Invalid Expiration Date!');
    }
    // #endregion

    // #region Generate shortUid
    let generatedShortUid = generateShortUid(id, long);
    let checkShortUidExistence = await this.prisma.url.findUnique({
      where: { shortUid: generatedShortUid },
    });

    while (checkShortUidExistence) {
      generatedShortUid = generateShortUid(id, long);

      checkShortUidExistence = await this.prisma.url.findUnique({
        where: { shortUid: generatedShortUid },
      });
    }
    // #endregion

    // Create Url
    return this.prisma.url.create({
      data: {
        ...createUrlPayload,
        expirationDate: parsed,
        shortUid: generatedShortUid,
        userId: id,
      },
    });
  }

  async findLongUrl(shortUid: string) {
    const urlExistence = await this.prisma.url.findUnique({
      where: { shortUid },
      select: { expirationDate: true, long: true },
    });

    if (!urlExistence) throw new BadRequestException('Invalid URL!');

    const parsed = new Date(urlExistence.expirationDate);
    if (parsed.getTime() < Date.now())
      throw new BadRequestException('Link Expired!');

    return urlExistence;
  }
}
