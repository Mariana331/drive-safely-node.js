import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    percent: { type: Number, default: 0 },
  },
  { _id: false },
);

const achievementSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    unlocked: { type: Boolean, default: false },
  },
  { _id: false },
);

const activitySchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const statsSchema = new mongoose.Schema(
  {
    videosAnalyzed: { type: Number, default: 0 },
    videosAnalyzedMonthly: { type: Number, default: 0 },
    rulesLearned: { type: Number, default: 0 },
    rulesLearnedMonthly: { type: Number, default: 0 },
    testsCompleted: { type: Number, default: 0 },
    testsCompletedMonthly: { type: Number, default: 0 },
    aiQuestions: { type: Number, default: 0 },
    aiQuestionsMonthly: { type: Number, default: 0 },
    achievementsCount: { type: Number, default: 0 },
    achievementsNew: { type: Number, default: 0 },
  },
  { _id: false },
);

const streakSchema = new mongoose.Schema(
  {
    current: { type: Number, default: 0 },
    lastActiveDate: { type: Date, default: null },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    dateOfBirth: { type: Date },
    country: { type: String, default: '' },
    driverLicense: { type: String, default: '' },
    experienceLevel: {
      type: String,
      enum: ['new', 'experienced', 'professional'],
      default: 'new',
    },
    avatarUrl: { type: String, default: '' },
    location: { type: String, default: '' },
    bio: { type: String, default: 'Driving with knowledge. Arriving with safety.' },
    safetyScore: { type: Number, default: 0 },
    xp: { type: Number, default: 0 },
    level: { type: String, default: 'Beginner' },
    stats: { type: statsSchema, default: () => ({}) },
    skills: { type: [skillSchema], default: [] },
    achievements: { type: [achievementSchema], default: [] },
    streak: { type: streakSchema, default: () => ({}) },
    activity: { type: [activitySchema], default: [] },
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);

export const defaultSkills = () => [
  { name: 'Traffic Signs', percent: 0 },
  { name: 'Parking', percent: 0 },
  { name: 'Pedestrians', percent: 0 },
  { name: 'Overtaking', percent: 0 },
  { name: 'Speed Control', percent: 0 },
];

export const defaultAchievements = () => [
  { id: 'first-analysis', title: 'First Analysis', unlocked: false },
  { id: 'rule-master', title: 'Rule Master', unlocked: false },
  { id: 'test-champion', title: 'Test Champion', unlocked: false },
  { id: 'safe-streak', title: 'Safe Streak', unlocked: false },
  { id: 'road-expert', title: 'Road Expert', unlocked: false },
  { id: 'ai-explorer', title: 'AI Explorer', unlocked: false },
];

export const toPublicUser = (user) => {
  const obj = user.toObject ? user.toObject() : user;
  const { passwordHash, ...publicUser } = obj;
  return publicUser;
};
