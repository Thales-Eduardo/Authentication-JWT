import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';
import ResponseUser from '../config/ResponseUser';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const AuthenticateUser = new AuthenticateUserService();

  const { user, token } = await AuthenticateUser.execute({
    email,
    password,
  });

  return response.json({ user: ResponseUser.render(user), token });
});

export default usersRouter;
