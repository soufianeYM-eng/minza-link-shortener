import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UrlService } from './url.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import CreateUrlDto from './dtos/create-url.dto';

@Controller('urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllUrls(@Request() req) {
    return this.urlService.findAllUrls(req.user.id)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createUrl(@Request() req, @Body() createUrlDto: CreateUrlDto) {
    return this.urlService.createUrl(req.user.sub, createUrlDto)
  }
}
