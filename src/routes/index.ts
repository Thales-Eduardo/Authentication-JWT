import { Router } from 'express';

import usersRouter from './Users.routes';
import LoginAuthRouter from './SessionsLoginAuth.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/sessions', LoginAuthRouter);

export default router;
