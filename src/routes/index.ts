import { Router } from 'express';

import usersRouter from './Users.routes';
import LoginAuthRouter from './LoginAuth.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/login', LoginAuthRouter);

export default router;
