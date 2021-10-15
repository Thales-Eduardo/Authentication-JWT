import { getRepository } from 'typeorm';
import dayjs from 'dayjs';
import { sign } from 'jsonwebtoken';

import RefreshToken from '../models/RefreshToken';

import AppErrors from '../errors/AppErrors';
import authConfig from '../config/auth';
import { GenerateRefreshToken } from '../providers/refreshToken/GenerateRefreshToken';

export class RefreshTokenUserServices {
  public async execute(id: string) {
    const refreshToken = getRepository(RefreshToken);

    const user = await refreshToken.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new AppErrors('Refresh token invalid');
    }

    const { secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.user_id,
      expiresIn: '1d',
    });

    const expired = dayjs().isAfter(dayjs.unix(user.expiresIn));
    if (expired) {
      const generateRefreshToken = new GenerateRefreshToken();
      await generateRefreshToken.execute(user.user_id);
    }

    return token;
  }
}
