import { getRepository } from 'typeorm';

import AppError from '../errors/AppErrors';

import UserTokens from '../models/UserTokens';
import Users from '../models/Users';

import { mailForgotPassword } from '../jobs/index';

interface IRequest {
  email: string;
}

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

    const users = { name: user.name, email: user.email, token: generate.token };
    await mailForgotPassword.add({ users });
  }
}
export default ForgotThePasswordService;
