import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import {
  comparePassword,
  hashPassword,
} from 'src/common/helpers/password.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly userServices: UserService,
    private readonly jwtServices: JwtService,
  ) {}

  async register(registerPayload: RegisterDto) {
    const { username, password, ...rest } = registerPayload;
    const userExisting = await this.userServices.findUserByUsername(username);

    if (userExisting) throw new ForbiddenException('Invalid Data!');
    const hashedPassword = await hashPassword(password);

    return this.userServices.createUser({
      username,
      password: hashedPassword,
      ...rest,
    });
  }

  async validateUser(loginPayload: LoginDto) {
    const { username, password } = loginPayload;
    const userExisting = await this.userServices.findUserByUsername(username);
    if (!userExisting) throw new NotFoundException('Invalid Credentials!');

    const isPasswordMatch = comparePassword(password, userExisting.password);
    if (!isPasswordMatch) throw new NotFoundException('Invalid Credentials!');

    return { id: userExisting.id, username, profile: userExisting.profile };
  }

  async login(id: string) {
    const userExisting = await this.userServices.findUserById(id);
    if (!userExisting) throw new NotFoundException('Invalid Credentials!');

    const jwtPayload = {
      sub: userExisting.id,
      username: userExisting.username,
    };
    const accessToken = await this.jwtServices.signAsync(jwtPayload);
    return { accessToken };
  }
}
