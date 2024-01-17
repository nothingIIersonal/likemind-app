import {
  Controller,
  UseGuards,
  Post,
  Req,
  Res,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '@modules/auth/jwt.authguard';
import { ProfileService } from './profile.service';
import UserRepository from '@repositories/user.repository';
import IUser from '@models/user.model';

@Controller('/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update')
  @UseInterceptors(FileInterceptor(''))
  async updateProfile(@Req() req: Request, @Res() res: Response) {
    const user = {} as IUser;

    user.id = +req.user.user_id;

    if (req.user.username != req.body.new_user.username) {
      const usernameExists = await UserRepository.existsByUsername(
        req.body.new_user.username,
      )
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });

      if (usernameExists) {
        throw new BadRequestException('The new username already exists');
      }

      user.username = req.body.new_user.username;
    }

    if (req.user.email != req.body.new_user.email) {
      const emailExists = await UserRepository.existsByEmail(
        req.body.new_user.email,
      )
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });

      if (emailExists) {
        throw new BadRequestException('The new email already exists');
      }

      user.email = req.body.new_user.email;
    }

    user.firstname = req.body.new_user.firstname;
    user.about = req.body.new_user.about;
    user.sex = req.body.new_user.sex;

    try {
      const resp = await this.profileService.updateProfile(user);

      return res
        .status(resp.status)
        .set({ 'Content-Type': 'application/json' })
        .send(resp);
    } catch (err) {
      throw err;
    }
  }
}
