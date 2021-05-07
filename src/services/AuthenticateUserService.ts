import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import Users from '../models/Users';
import authConfig from '../config/auth';
import AppErrors from '../errors/AppErrors';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: Users;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(Users);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppErrors('E-mail ou senha esta, incorreto.', 401);
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      throw new AppErrors('E-mail ou senha esta, incorreto.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
