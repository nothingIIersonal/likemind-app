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

    const user = await UserRepository.existsByUsername(username);
    if (!user || !UserRepository.existsByEmail(email)) {
      throw new UnauthorizedException("Profile doesn't exists");
    }

    const { password, ...result } = user;

    return result;
  }
}
