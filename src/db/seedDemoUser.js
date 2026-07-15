import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { initMongoConnection } from './initMongoDB.js';

dotenv.config();

const demoUser = {
  fullName: 'Olivia Johnson',
  email: 'olivia@example.com',
  password: 'password123',
  dateOfBirth: new Date('1995-03-15'),
  country: 'United States',
  driverLicense: 'NY-12345678',
  experienceLevel: 'experienced',
  location: 'New York, USA',
  bio: 'Driving with knowledge. Arriving with safety.',
  avatarUrl: '',
  safetyScore: 92,
  xp: 1350,
  level: 'Safe Driver',
  stats: {
    videosAnalyzed: 48,
    videosAnalyzedMonthly: 6,
    rulesLearned: 84,
    rulesLearnedMonthly: 12,
    testsCompleted: 37,
    testsCompletedMonthly: 5,
    aiQuestions: 112,
    aiQuestionsMonthly: 18,
    achievementsCount: 18,
    achievementsNew: 2,
  },
  skills: [
    { name: 'Traffic Signs', percent: 96 },
    { name: 'Parking', percent: 83 },
    { name: 'Pedestrians', percent: 100 },
    { name: 'Overtaking', percent: 72 },
    { name: 'Speed Control', percent: 65 },
  ],
  achievements: [
    { id: 'first-analysis', title: 'First Analysis', unlocked: true },
    { id: 'rule-master', title: 'Rule Master', unlocked: true },
    { id: 'test-champion', title: 'Test Champion', unlocked: true },
    { id: 'safe-streak', title: 'Safe Streak', unlocked: true },
    { id: 'road-expert', title: 'Road Expert', unlocked: false },
    { id: 'ai-explorer', title: 'AI Explorer', unlocked: true },
  ],
  streak: { current: 12, lastActiveDate: new Date() },
  activity: [
    { type: 'video', text: 'Analyzed a video', createdAt: new Date() },
    {
      type: 'test',
      text: 'Completed practice test',
      createdAt: new Date(Date.now() - 86400000),
    },
    {
      type: 'rules',
      text: 'Learned 5 new rules',
      createdAt: new Date(Date.now() - 172800000),
    },
    {
      type: 'achievement',
      text: 'Earned achievement',
      createdAt: new Date(Date.now() - 259200000),
    },
  ],
};

const seedDemoUser = async () => {
  try {
    await initMongoConnection();

    const existing = await User.findOne({ email: demoUser.email });
    if (existing) {
      console.log('Demo user already exists. Skipping seed.');
      return;
    }

    const passwordHash = await bcrypt.hash(demoUser.password, 10);
    const { password, ...userData } = demoUser;

    await User.create({ ...userData, passwordHash });
    console.log('Demo user seeded: olivia@example.com / password123');
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
};

seedDemoUser().catch((err) => {
  console.error('Demo user seed failed:', err.message);
  process.exit(1);
});
