import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../src/models/User.js';
import { USER_ROLES } from '../src/types/auth.js';

dotenv.config({ path: '.env' });

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/pmtool';

const users = [
  { name: 'Admin User', email: 'admin@test.com', password: 'Password123!', role: USER_ROLES.Admin },
  { name: 'Team Leader', email: 'leader@test.com', password: 'Password123!', role: USER_ROLES.TeamLeader },
  { name: 'Team Member', email: 'member@test.com', password: 'Password123!', role: USER_ROLES.Member },
];

const run = async (): Promise<void> => {
  await mongoose.connect(MONGO_URI);
  await User.deleteMany({ email: { $in: users.map((user) => user.email) } });
  await User.insertMany(users);
  // eslint-disable-next-line no-console
  console.log('Seeded demo users.');
  await mongoose.disconnect();
};

void run();
