import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ResetPasswordService from '../services/ResetPasswordService';
import ForgotThePasswordService from '../services/ForgotThePasswordService';

const passwordRouter = Router();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  async (resquest, response) => {
    const { email } = resquest.body;

    const forgotThePassword = new ForgotThePasswordService();

    await forgotThePassword.execute(email);

    return response.status(204).json();
  }
);

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  async (resquest, response) => {
    const { token, password } = resquest.body;

    const resetPassword = new ResetPasswordService();

    await resetPassword.execute({ token, password });

    return response.status(204).json();
  }
);

export default passwordRouter;
