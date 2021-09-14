import { getRepository } from 'typeorm';
import { hash, compare } from 'bcryptjs';

import AppError from '../errors/AppErrors';
import Users from '../models/Users';

import { CacheProvider } from './CacheService';

interface Request {
  user_id: string;
  name: string;
  surname: string;
  email: string;
  old_Password: string;
  newPassword: string;
}

const cacheProvider = new CacheProvider();

class UpdateUserDataService {
  public async execute({
    user_id,
    name,
    surname,
    email,
    old_Password,
    newPassword,
  }: Request): Promise<Users> {
    const userRepository = getRepository(Users);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Token JWT invalido', 401);
    }

    const userWithUpdatedEmail = await userRepository.findOne({
      where: { email },
    });

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('Esse e-mail já está em uso!', 403);
    }

    user.name = name;
    user.surname = surname;
    user.email = email;

    if (newPassword && !old_Password) {
      throw new AppError('Para atualizar sua senha, informe sua antiga senha!');
    }

    if (newPassword && old_Password) {
      const comparePassword = await compare(old_Password, user.password);

      if (!comparePassword) {
        throw new AppError(
          'Para atualizar sua senha, informe sua antiga senha correto!'
        );
      }

      user.password = await hash(newPassword, 8);
    }

    await cacheProvider.invalidatePrefix('users');

    return await userRepository.save(user);
  }
}

export default UpdateUserDataService;
