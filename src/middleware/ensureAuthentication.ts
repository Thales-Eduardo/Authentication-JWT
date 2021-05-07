import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';
import AppErrors from '../errors/AppErrors';

interface TokenPlayLoad {
  iat: number;
  exp: number;
  sub: string;
}

function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppErrors('Token JWT ausente ', 401);
  }

  const [, token] = authorization.split(' ');

  try {
    const decode = verify(token, authConfig.jwt.secret);

    const { sub } = decode as TokenPlayLoad;

    request.userId = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppErrors('Token JWT invalido', 401);
  }
}

export default ensureAuthentication;
