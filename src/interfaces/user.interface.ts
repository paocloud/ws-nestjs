import { Document } from 'mongoose';

export interface User extends Document {
  fullname: string;
  lastname: string;
  nickname: string;
  username: string;
  password: string;
  email: string;
}