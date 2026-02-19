import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../utils/apiError.js';

export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  if (error instanceof ZodError) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Validation failed',
      issues: error.issues,
    });
    return;
  }

  if (error instanceof ApiError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: 'Something went wrong',
  });
};
