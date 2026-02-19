export const USER_ROLES = {
  Admin: 'Admin',
  TeamLeader: 'TeamLeader',
  Member: 'Member',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export interface JwtPayload {
  sub: string;
  role: UserRole;
  email: string;
}
