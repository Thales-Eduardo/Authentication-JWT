import { getRepository } from 'typeorm';
import dayjs from 'dayjs';
import RefreshToken from '../../models/RefreshToken';

export class GenerateRefreshToken {
  public async execute(userId: string) {
    const refreshToken = getRepository(RefreshToken);

    const userById = await refreshToken.findOne({
      where: { user_id: userId },
    });

    if (userById) {
      await refreshToken.remove(userById);
    }

    const expire = dayjs().add(1, 'day').unix();

    const user = refreshToken.create({
      expiresIn: expire,
      user_id: userId,
    });

    return await refreshToken.save(user);
  }
}
