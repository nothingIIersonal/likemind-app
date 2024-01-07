import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import UserRepository from '@repositories/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const username = payload.username;
    const email = payload.sub;

    if (
      !UserRepository.existsByUsername(username) ||
      !UserRepository.existsByEmail(email)
    ) {
      throw new UnauthorizedException("Profile doesn't exists");
    }

    return { username: payload.username, email: payload.sub };
  }
}
