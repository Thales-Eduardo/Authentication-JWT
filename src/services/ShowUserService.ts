import { getRepository } from 'typeorm';

import AppError from '../errors/AppErrors';
import Users from '../models/Users';

interface Request {
  userId: string;
}

class ShowUserService {
  public async execute({ userId }: Request): Promise<Users> {
    const userRepository = getRepository(Users);

    const user = await userRepository.findOne(userId);

    if (!user) {
      throw new AppError('Esse usuário não existe!', 403);
    }

    return user;
  }
}

export default ShowUserService;
