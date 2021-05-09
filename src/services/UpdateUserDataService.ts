import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppErrors';
import Users from '../models/Users';

interface Request {
  user_id: string;
  password: string;
}

class UpdateUserDataService {
  public async execute({ user_id, password }: Request): Promise<void> {
    const userRepository = getRepository(Users);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Token JWT invalido', 401);
    }

    const hashedPassword = await hash(password, 8);

    user.password = hashedPassword;

    await userRepository.save(user);
  }
}

export default UpdateUserDataService;
