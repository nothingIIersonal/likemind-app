import { Injectable } from '@nestjs/common';
import UserRepository from '@repositories/user.repository';
import User from '@models/user.model';

@Injectable()
export class ProfileService {
  async updateProfile(user: User) {
    const data = await UserRepository.updateProfile(user)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });

    if (!data) {
      return { status: 500, message: "Can't update profile" };
    }

    const temp = await UserRepository.retrieveById(user.id);
    const { password, ...new_user } = temp;

    return { status: 200, message: 'Profile updated', new_user: new_user };
  }
}
