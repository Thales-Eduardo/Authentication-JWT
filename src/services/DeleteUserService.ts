import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import AppErrors from '../errors/AppErrors';
import uploadConfig from '../config/upload';
import Users from '../models/Users';

import { CacheProvider } from './CacheService';
const cacheProvider = new CacheProvider();

class DeleteUserService {
  public async executar(id: string): Promise<void> {
    const userRepository = getRepository(Users);

    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      throw new AppErrors('Esse usuário não existe', 404);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvartarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvartarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    await cacheProvider.invalidatePrefix('users');
    await userRepository.remove(user);
  }
}

export default DeleteUserService;
