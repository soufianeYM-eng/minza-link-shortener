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

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  findUser(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }
}
