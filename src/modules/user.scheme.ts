import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  fullname: String,
  lastname: String,
  nickname: String,
  username: String,
  password: String,
  email: String,
});