import { toPublicUser } from '../models/User.js';
import { sendResponse } from '../utils/sendResponse.js';

export const getProfile = (req, res) => {
  const user = toPublicUser(req.user);

  sendResponse(res, {
    data: {
      profile: {
        user,
        stats: user.stats,
        skills: user.skills,
        achievements: user.achievements,
        streak: user.streak,
        activity: user.activity,
        safetyScore: user.safetyScore,
        xp: user.xp,
        level: user.level,
        totalAchievements: 30,
        unlockedAchievements: user.achievements.filter((a) => a.unlocked).length,
        xpToNextLevel: 2000,
      },
    },
  });
};
