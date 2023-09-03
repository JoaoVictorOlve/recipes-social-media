import { User } from "./user";

export interface LoginRequest {
  msg: string,
  token: string,
  user: User
}
