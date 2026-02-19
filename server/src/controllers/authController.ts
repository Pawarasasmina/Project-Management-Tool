import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import { User } from '../models/User.js';
import { USER_ROLES } from '../types/auth.js';
import { ApiError } from '../utils/apiError.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../services/tokenService.js';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.nativeEnum(USER_ROLES).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1).optional(),
});

const sanitizeUser = (user: { _id: unknown; name: string; email: string; role: string }) => ({
  id: String(user._id),
  name: user.name,
  email: user.email,
  role: user.role,
});

const setRefreshCookie = (res: Response, refreshToken: string): void => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/api/auth/refresh',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const payload = registerSchema.parse(req.body);

  const existing = await User.findOne({ email: payload.email });
  if (existing) throw new ApiError(StatusCodes.CONFLICT, 'Email already in use');

  const user = await User.create(payload);
  const jwtPayload = { sub: String(user._id), email: user.email, role: user.role };
  const accessToken = signAccessToken(jwtPayload);
  const refreshToken = signRefreshToken(jwtPayload);

  user.refreshToken = refreshToken;
  await user.save();
  setRefreshCookie(res, refreshToken);

  res.status(StatusCodes.CREATED).json({ user: sanitizeUser(user), accessToken });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const payload = loginSchema.parse(req.body);

  const user = await User.findOne({ email: payload.email });
  if (!user) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');

  const isPasswordValid = await user.comparePassword(payload.password);
  if (!isPasswordValid) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');

  const jwtPayload = { sub: String(user._id), email: user.email, role: user.role };
  const accessToken = signAccessToken(jwtPayload);
  const refreshToken = signRefreshToken(jwtPayload);

  user.refreshToken = refreshToken;
  await user.save();
  setRefreshCookie(res, refreshToken);

  res.json({ user: sanitizeUser(user), accessToken });
};

export const refresh = async (req: Request, res: Response): Promise<void> => {
  const parsed = refreshSchema.parse(req.body);
  const rawToken = req.cookies.refreshToken ?? parsed.refreshToken;

  if (!rawToken) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Refresh token missing');

  const payload = verifyRefreshToken(rawToken);
  const user = await User.findById(payload.sub);

  if (!user || user.refreshToken !== rawToken) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid refresh token');
  }

  const jwtPayload = { sub: String(user._id), email: user.email, role: user.role };
  const accessToken = signAccessToken(jwtPayload);
  const refreshToken = signRefreshToken(jwtPayload);

  user.refreshToken = refreshToken;
  await user.save();
  setRefreshCookie(res, refreshToken);

  res.json({ accessToken, user: sanitizeUser(user) });
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  const rawToken = req.cookies.refreshToken ?? req.body?.refreshToken;
  if (rawToken) {
    const payload = verifyRefreshToken(rawToken);
    await User.findByIdAndUpdate(payload.sub, { refreshToken: null });
  }

  res.clearCookie('refreshToken', { path: '/api/auth/refresh' });
  res.status(StatusCodes.NO_CONTENT).send();
};

export const me = async (req: Request, res: Response): Promise<void> => {
  const user = await User.findById(req.user?.sub).select('-password -refreshToken');
  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  res.json({ user: sanitizeUser(user as never) });
};
