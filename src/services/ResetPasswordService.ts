import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { isAfter, addHours } from 'date-fns';

import UserTokens from '../models/UserTokens';
import Users from '../models/Users';

import AppError from '../errors/AppErrors';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userRepository = getRepository(Users);
    const userTokensRepository = getRepository(UserTokens);

    const userToken = await userTokensRepository.findOne({ where: { token } });

    if (!userToken) {
      throw new AppError('Esse token do usuário não existe');
    }

    const user = await userRepository.findOne({
      where: { id: userToken.user_id },
    });

    if (!user) {
      throw new AppError('Esse usuário não existe');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 1);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado');
    }

    user.password = await hash(password, 8);

    await userRepository.save(user);
  }
}
export default ResetPasswordService;

//O token gerado pelo uuid tera 1 horas de duração logo depois sera invalido.
