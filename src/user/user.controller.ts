import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch all users' })
  @ApiOkResponse({ description: 'List of users fetched successfully.' })
  @UseGuards(JwtAuthGuard)
  getAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Fetch a specific user' })
  @ApiOkResponse({ description: 'The specific user is fetched successfully.' })
  @UseGuards(JwtAuthGuard)
  getUser(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }
}
