import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LocalGuard } from './guards/local.guard';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Creating a new user' })
  @ApiOkResponse({
    description: 'New user created successfully.',
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with username and password' })
  @ApiOkResponse({
    description: 'User authenticated successfully.',
  })
  @UseGuards(LocalGuard)
  async login(@Request() req) {
    return this.authService.login(req.user.id);
  }
}
