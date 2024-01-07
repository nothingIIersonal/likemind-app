import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserRepository from '@repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUserByUsername(username: string, pass: string): Promise<any> {
    const user = await UserRepository.passwordCheckByUsername(username, pass);

    if (user) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async validateUserByEmail(email: string, pass: string): Promise<any> {
    const user = await UserRepository.passwordCheckByEmail(email, pass);

    if (user) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
