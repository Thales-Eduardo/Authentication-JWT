import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Users from '../models/Users';
import AppErrors from '../errors/AppErrors';

import NotificationUserServices from './NotificationUserServices';
import { CacheProvider } from './CacheService';
import { mailRegister } from '../jobs/index';

interface Request {
  name: string;
  surname: string;
  email: string;
  password: string;
}

const notification = new NotificationUserServices();
const cacheProvider = new CacheProvider();

class CreateUsersService {
  public async execute({
    name,
    surname,
    email,
    password,
  }: Request): Promise<Users> {
    const UserRepository = getRepository(Users);

    const checkUserExists = await UserRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppErrors('Esse email já existe!');
    }

    const hashedPassword = await hash(password, 8);

    const newUser = UserRepository.create({
      name,
      surname,
      email,
      password: hashedPassword,
    });

    await UserRepository.save(newUser);

    const user = { name, surname, email };
    await mailRegister.add({ user });

    await notification.create({
      user_id: `${newUser.id}`,
      content: `Olá ${newUser.name}, uma mensagem de boas-vindas foi enviada para seu e-mail.`,
    });

    await cacheProvider.invalidatePrefix('users');

    return newUser;
  }
}
export default CreateUsersService;
