import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';
import ResponseUser from '../config/ResponseUser';
import DeleteUserService from '../services/DeleteUserService';

import ensureAuthentication from '../middleware/ensureAuthentication';
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

usersRouter.delete(
  '/deleteuser',
  ensureAuthentication,
  async (request, response) => {
    const id = request.userId.id;

    const deleteUser = new DeleteUserService();

    await deleteUser.executar(id);

    response.status(204).send();
  }
);

export default usersRouter;
