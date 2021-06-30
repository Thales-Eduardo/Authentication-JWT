import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AuthenticateUserService from '../services/AuthenticateUserService';

import ResponseUser from '../config/ResponseUser';

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

    const { user, token } = await AuthenticateUser.execute({
      email,
      password,
    });

    return response.json({ user: ResponseUser.render(user), token });
  }
);

export default usersRouter;
