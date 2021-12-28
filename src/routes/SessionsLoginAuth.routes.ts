import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { classToPlain } from 'class-transformer';

import AuthenticateUserService from '../services/AuthenticateUserService';

const usersRouter = Router();

usersRouter.post(
  '/',
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

    return response.json({ user: classToPlain(user), token, refreshToken });
  }
);

export default usersRouter;
