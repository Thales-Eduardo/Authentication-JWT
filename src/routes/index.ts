import { Router } from 'express';

import usersRouter from './Users.routes';
import LoginAuthRouter from './SessionsLoginAuth.routes';
import passwordRoutes from './password.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/sessions', LoginAuthRouter);
router.use('/password', passwordRoutes);

export default router;
