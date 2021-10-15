import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import Users from '../models/Users';
import authConfig from '../config/auth';
import AppError from '../errors/AppErrors';

import { GenerateRefreshToken } from '../providers/refreshToken/GenerateRefreshToken';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: Users;
  token: string;
  refreshToken: any;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(Users);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('E-mail ou senha esta, incorreto.');
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      throw new AppError('E-mail ou senha esta, incorreto.');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generateRefreshToken.execute(user.id);

    return {
      user,
      token,
      refreshToken,
    };
  }
}

export default AuthenticateUserService;
