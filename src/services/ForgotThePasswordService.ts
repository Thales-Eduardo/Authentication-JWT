import { getRepository } from 'typeorm';
import path from 'path';

import AppError from '../errors/AppErrors';

import UserTokens from '../models/UserTokens';
import Users from '../models/Users';

import EtherealMailProvider from '../providers/mailProvider/mail';

interface IRequest {
  email: string;
}

const sendmailProvider = new EtherealMailProvider();

class ForgotThePasswordService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getRepository(Users);
    const userTokensRepository = getRepository(UserTokens);

    const user = await userRepository.findOne(email);

    if (!user) {
      throw new AppError('Esse usuário não existe');
    }

    const generate = userTokensRepository.create({
      user_id: user.id,
    });

    await userTokensRepository.save(generate);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'ForgotPassword.hbs'
    );

    await sendmailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[THALES] Recuperação de senha.',
      template: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${generate.token}`,
        },
      },
    });
  }
}
export default ForgotThePasswordService;
