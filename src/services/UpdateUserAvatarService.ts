import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import Users from '../models/Users';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppErrors';

interface Request {
  userId: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFilename }: Request): Promise<Users> {
    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOne(userId);

    if (!user) {
      throw new AppError('Esse usuário não existe');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvartarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvartarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
