import { getRepository } from 'typeorm';

import AppError from '../errors/AppErrors';
import Users from '../models/Users';
import { classToClass } from 'class-transformer';

import { CacheProvider } from './CacheService';

interface Request {
  userId: string;
}

const cacheProvider = new CacheProvider();

class ShowUsersService {
  public async execute({ userId }: Request): Promise<Users[]> {
    const userRepository = getRepository(Users);
    const checkId = await userRepository.findOne(userId);

    if (!checkId) {
      throw new AppError('Esse usuário não existe!', 403);
    }

    let users = await cacheProvider.getCache<Users[]>(`users:${userId}`);

    if (!users) {
      users = await userRepository.find();
      await cacheProvider.save(`users:${userId}`, classToClass(users));
    }

    return users;
  }
}

export default ShowUsersService;
