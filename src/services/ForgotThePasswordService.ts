import { getRepository } from 'typeorm';
// import path from 'path';

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
    console.log(user?.email);

    if (!user) {
      throw new AppError('Esse usuário não existe');
    }

    const generate = userTokensRepository.create({
      user_id: user.id,
    });

    await userTokensRepository.save(generate);

    await sendmailProvider.sendMail(user.email, `token: ${generate.token}`);
    console.log(sendmailProvider);
  }
}
export default ForgotThePasswordService;
