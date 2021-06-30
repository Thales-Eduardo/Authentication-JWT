import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import path from 'path';

import Users from '../models/Users';
import AppErrors from '../errors/AppErrors';

import EtherealMailProvider from '../providers/mailProvider/mail';
import NotificationUserServices from './NotificationUserServices';

interface Request {
  name: string;
  surname: string;
  email: string;
  password: string;
}

const notification = new NotificationUserServices();
const sendmailProvider = new EtherealMailProvider();

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

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'createUser.hbs'
    );

    await sendmailProvider.sendMail({
      to: {
        name: newUser.name,
        email: newUser.email,
      },
      subject: '[THALES] Cadastro Concluído.',
      template: {
        file: forgotPasswordTemplate,
        variables: {
          name: newUser.name,
          surname: newUser.surname,
        },
      },
    });

    await notification.create({
      user_id: `${newUser.id}`,
      content: `Olá ${newUser.name}, uma mensagem de boas-vindas foi enviada para seu e-mail.`,
    });

    return newUser;
  }
}
export default CreateUsersService;
