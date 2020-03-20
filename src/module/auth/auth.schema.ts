import * as Mongoose from 'mongoose';

export const AuthSchema = new Mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
