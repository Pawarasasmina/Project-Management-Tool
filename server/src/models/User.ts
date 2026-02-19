import mongoose, { InferSchemaType, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { USER_ROLES } from '../types/auth.js';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
    role: { type: String, enum: Object.values(USER_ROLES), default: USER_ROLES.Member },
    refreshToken: { type: String, default: null },
  },
  { timestamps: true }
);

userSchema.pre('save', async function userPreSave(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function comparePassword(candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

export type UserDocument = InferSchemaType<typeof userSchema> & {
  comparePassword: (candidate: string) => Promise<boolean>;
};

export const User = mongoose.model('User', userSchema) as Model<UserDocument>;
