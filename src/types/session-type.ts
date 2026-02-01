import { ROLE } from "./enum";
export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: (typeof ROLE)[keyof typeof ROLE];
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  expiresAt: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  ipAddress: string;
  userAgent: string;
  userId: string;
}

export interface SessionWithUser {
  session: Session;
  user: User;
}
