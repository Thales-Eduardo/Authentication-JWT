import { request, response, Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUsersService from '../services/CreateUserService';
import UpadateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthentication from '../middleware/ensureAuthentication';
import ResponseUser from '../config/ResponseUser';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, surname, email, password } = request.body;

  const createUsers = new CreateUsersService();

  const newUser = await createUsers.execute({
    name,
    surname,
    email,
    password,
  });

  return response.json({ user: ResponseUser.render(newUser) });
});

usersRouter.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  async (request, response) => {
    const createUsers = new UpadateUserAvatarService();

    const newAvatar = await createUsers.execute({
      userId: request.userId.id,
      avatarFilename: request.file.filename,
    });

    return response.json({ user: ResponseUser.render(newAvatar) });
  }
);

export default usersRouter;
