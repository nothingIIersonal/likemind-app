import { Controller, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { Response, Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { RegisterService } from './register.service';

@Controller('/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor(''))
  async registerUser(@Req() req: Request, @Res() res: Response) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    try {
      const resp = await this.registerService.registerUser(
        username,
        email,
        password,
      );

      return res
        .status(resp.status)
        .set({ 'Content-Type': 'application/json' })
        .send(resp);
    } catch (err) {
      throw err;
    }
  }
}
