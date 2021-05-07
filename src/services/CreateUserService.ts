import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Users from '../models/Users';
import AppErrors from '../errors/AppErrors';

interface Request {
  name: string;
  surname: string;
  email: string;
  password: string;
}

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

    return newUser;
  }
}
export default CreateUsersService;
