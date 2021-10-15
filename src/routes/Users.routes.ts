import { Router, Request } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';
import { classToClass } from 'class-transformer';

import uploadConfig from '../config/upload';

import CreateUsersService from '../services/CreateUserService';
import UpadateUserAvatarService from '../services/UpdateUserAvatarService';
import DeleteUserService from '../services/DeleteUserService';
import UpdateUserDataService from '../services/UpdateUserDataService';
import ShowUsersService from '../services/ShowUsersService';
import { RefreshTokenUserServices } from '../services/RefreshTokenUserServices';

import ensureAuthentication from '../middleware/ensureAuthentication';

interface MulterRequest extends Request {
  file: any;
}

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/profile', ensureAuthentication, async (request, response) => {
  const showUser = new ShowUsersService();

  const user = await showUser.execute({
    userId: request.userId.id,
  });

  return response.json(classToClass(user));
});

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      surname: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  async (request, response) => {
    const { name, surname, email, password } = request.body;

    const createUsers = new CreateUsersService();

    const newUser = await createUsers.execute({
      name,
      surname,
      email,
      password,
    });

    return response.json(classToClass(newUser));
  }
);

usersRouter.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  async (request, response) => {
    const createUsers = new UpadateUserAvatarService();

    const newAvatar = await createUsers.execute({
      userId: request.userId.id,
      avatarFilename: (request as MulterRequest).file.filename,
    });

    return response.json(classToClass(newAvatar));
  }
);

usersRouter.put(
  '/updating',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      surname: Joi.string().required(),
      email: Joi.string().email().required(),
      old_Password: Joi.string(),
      newPassword: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('newPassword')),
    },
  }),
  ensureAuthentication,
  async (request, response) => {
    const { name, surname, email, old_Password, newPassword } = request.body;

    const updateUserData = new UpdateUserDataService();

    const user = await updateUserData.execute({
      user_id: request.userId.id,
      name,
      surname,
      email,
      old_Password,
      newPassword,
    });

    return response.json(classToClass(user));
  }
);

usersRouter.delete(
  '/delete_profile',
  ensureAuthentication,
  async (request, response) => {
    const id = request.userId.id;

    const deleteUser = new DeleteUserService();

    await deleteUser.executar(id);

    return response.status(204).send();
  }
);

usersRouter.post('/refresh_token', async (request, response) => {
  const { id } = request.body;

  const refreshTokenUser = new RefreshTokenUserServices();
  const token = await refreshTokenUser.execute(id);

  response.json({ token: token });
});

export default usersRouter;
