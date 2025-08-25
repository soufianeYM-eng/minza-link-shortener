import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import CreateUrlDto from './dtos/create-url.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch all urls related to connected user' })
  @ApiOkResponse({
    description: 'All connected user urls are fetched successfully.',
  })
  @UseGuards(JwtAuthGuard)
  getAllUrls(@Request() req) {
    return this.urlService.findAllUrls(req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Short a url' })
  @ApiOkResponse({
    description: 'Shortener link of your URL is created successfully.',
  })
  @UseGuards(JwtAuthGuard)
  createUrl(@Request() req, @Body() createUrlDto: CreateUrlDto) {
    return this.urlService.createUrl(req.user.sub, createUrlDto);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Retrieve the long URL of a shortened url' })
  @ApiOkResponse({ description: 'Long URL is retrieved successfully.' })
  getLongUrl(@Param('id') shortUid: string) {
    return this.urlService.findLongUrl(shortUid);
  }
}
