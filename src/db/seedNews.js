import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { News } from '../models/News.js';
import { initMongoConnection } from './initMongoDB.js';

dotenv.config();

const seedArticles = [
  {
    title: 'New Road Safety Law Enters Into Force',
    slug: 'new-road-safety-law',
    excerpt:
      'Important changes to road safety regulations are now in effect. Learn what every driver needs to know.',
    category: 'New Law',
    imageUrl: '',
    publishedAt: new Date('2024-05-18'),
    isPublished: true,
  },
  {
    title: 'Updated Rules for Roundabouts',
    slug: 'updated-roundabout-rules',
    excerpt:
      'New guidelines for navigating roundabouts safely. Understand priority rules and common mistakes.',
    category: 'Update',
    imageUrl: '',
    publishedAt: new Date('2024-05-12'),
    isPublished: true,
  },
  {
    title: 'What to Do at Yellow Light?',
    slug: 'yellow-light-guidelines',
    excerpt:
      'A quick reminder on how to handle yellow traffic lights correctly and avoid dangerous situations.',
    category: 'Reminder',
    imageUrl: '',
    publishedAt: new Date('2024-05-08'),
    isPublished: true,
  },
];

const seedNews = async () => {
  await initMongoConnection();

  const count = await News.countDocuments();
  if (count > 0) {
    console.log(`Database already has ${count} articles. Skipping seed.`);
    await mongoose.disconnect();
    return;
  }

  await News.insertMany(seedArticles);
  console.log(`Seeded ${seedArticles.length} news articles.`);
  await mongoose.disconnect();
};

seedNews().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
