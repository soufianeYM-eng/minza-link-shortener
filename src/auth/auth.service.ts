import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dtos/register.dto';
import { hashSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userServices: UserService) {}

  async register(registerPayload: RegisterDto) {
    const { username, password, ...rest } = registerPayload;
    const userExisting = await this.userServices.findUserByUsername(username);

    if (userExisting) throw new ForbiddenException('Invalid Data!');
    const splitRounds = 10;
    const hashedPassword = hashSync(password, splitRounds);

    return this.userServices.createUser({
      username,
      password: hashedPassword,
      ...rest,
    });
  }
}
