import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { UserRole } from '../types/auth.js';

export const authorize = (...roles: UserRole[]) => (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
    return;
  }

  if (!roles.includes(req.user.role)) {
    res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' });
    return;
  }

  next();
};
