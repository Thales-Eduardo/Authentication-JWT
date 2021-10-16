import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '../services/AuthenticateUserService';
import { bruteForce } from '../providers/BruteForce/bruteRedis';

const usersRouter = Router();

usersRouter.post(
  '/',
  bruteForce.prevent,
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  async (request, response) => {
    const { email, password } = request.body;

    const AuthenticateUser = new AuthenticateUserService();

    const { user, token, refreshToken } = await AuthenticateUser.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token, refreshToken });
  }
);

export default usersRouter;
