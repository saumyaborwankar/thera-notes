import { UserResponse } from '../dto/user.dto';

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthResponse = {
  tokens: Tokens;
  user: UserResponse;
};

export type JwtPayload = {
  email: string;
  username: string;
};

export type RegisterResponse = {
  message: string;
};

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };
