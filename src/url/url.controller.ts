import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UrlService } from './url.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllUrls(@Request() req) {
    return this.urlService.findAllUrls(req.user.id)
  }
}
