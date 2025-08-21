import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authServices: AuthService) {
    super();
  }

  validate(username: string, password: string) {
    return this.authServices.validateUser({ username, password });
  }
}
