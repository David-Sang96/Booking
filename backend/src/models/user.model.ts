import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import { UserType } from '../shared/types';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcryptjs.genSalt(12);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

const User = mongoose.model<UserType>('User', userSchema);

export default User;
