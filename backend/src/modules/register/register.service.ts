import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import UserRepository from '@repositories/user.repository';

@Injectable()
export class RegisterService {
  async registerUser(username: string, email: string, password: string) {
    if (!username || !email || !password) {
      throw new BadRequestException('Fill all fields');
    }

    const emailExists = await UserRepository.existsByEmail(email)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });

    const usernameExists = await UserRepository.existsByUsername(username)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });

    if (emailExists || usernameExists) {
      throw new BadRequestException('User exists');
    }

    await UserRepository.save({
      username: username,
      email: email,
      password: password,
    })
      .then((res) => {
        return res;
      })
      .catch(() => {
        throw new InternalServerErrorException("Can't proceed registration");
      });

    return { status: 200, message: 'Successfully registered' };
  }
}
