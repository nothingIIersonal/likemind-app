import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import UserRepository from '@repositories/user.repository';
import User from '@models/user.model';

@Injectable()
export class ProfileService {
  async profileUser(username: string, email: string, password: string) {
    if (username.length == 0 || email.length == 0 || password.length == 0) {
      throw new BadRequestException('Fill all fields');
    }

    const emailExists = await UserRepository.existsByEmail(email);
    const usernameExists = await UserRepository.existsByUsername(username);
    if (emailExists || usernameExists) {
      throw new BadRequestException('User not found or invalid data');
    }

    let user: User;
    user.username = username;
    user.email = email;
    user.password = password;

    const response = await UserRepository.save(user);
    if (!response) {
      throw new InternalServerErrorException('Unknown error');
    }

    return { status: 200, message: 'Successfully profileed' };
  }
}