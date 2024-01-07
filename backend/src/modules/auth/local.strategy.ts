import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    if (!username || !password) {
      throw new BadRequestException('Fill all fields');
    }

    const user = await this.authService.validateUserByUsername(
      username,
      password,
    );

    if (!user) {
      throw new UnauthorizedException(
        "User doesn't exists or invalid credentials",
      );
    }

    return user;
  }
}
