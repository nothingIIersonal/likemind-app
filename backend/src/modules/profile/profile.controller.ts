import { Controller, UseGuards, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '@modules/auth/jwt.authguard';

@Controller('/profile')
export class ProfileController {
  @UseGuards(JwtAuthGuard)
  @Post('/')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
