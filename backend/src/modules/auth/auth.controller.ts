import {
  Controller,
  Post,
  UseGuards,
  Req,
  Res,
  UseInterceptors,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from '@modules/auth/auth.service';
import { LocalAuthGuard } from '@modules/auth/local.authguard';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @UseInterceptors(FileInterceptor(''))
  async login(@Req() req: Request, @Res() res: Response) {
    const access_token = await this.authService
      .login(req.user)
      .then((res_struct) => {
        return res_struct.access_token;
      })
      .catch(() => {
        throw new UnauthorizedException("Can't generate token");
      });

    const date_res = new Date();
    date_res.setMinutes(
      date_res.getMinutes() + Number(process.env.JWT_EXPIRE_RAW),
    );

    return res
      .cookie('access_token', `Bearer ${access_token}`, {
        httpOnly: false,
        secure: false,
        sameSite: 'strict',
        expires: date_res,
      })
      .send({ status: 200, message: 'Successfully logged in' });
  }
}
