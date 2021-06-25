import { Router } from 'express';

import ResetPasswordService from '../services/ResetPasswordService';
import ForgotThePasswordService from '../services/ForgotThePasswordService';

const passwordRouter = Router();

passwordRouter.post('/forgot', async (resquest, response) => {
  const { email } = resquest.body;

  const forgotThePassword = new ForgotThePasswordService();

  await forgotThePassword.execute(email);

  return response.status(204).json();
});

passwordRouter.post('/reset', async (resquest, response) => {
  const { token, password } = resquest.body;

  const resetPassword = new ResetPasswordService();

  await resetPassword.execute({ token, password });

  return response.status(204).json();
});

export default passwordRouter;
