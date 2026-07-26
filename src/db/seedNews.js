import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { News } from '../models/News.js';
import { initMongoConnection } from './initMongoDB.js';

dotenv.config();

const seedArticles = [
  {
    title: 'New Speed Limit Changes in City Center',
    slug: 'new-speed-limit-changes-city-center',
    excerpt:
      'City officials announced reduced speed limits in downtown areas to improve pedestrian safety and reduce accidents.',
    category: 'Traffic News',
    imageUrl:
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 3,
    country: 'United States',
    publishedAt: new Date('2024-05-16'),
    isPublished: true,
  },
  {
    title: 'How to Drive Safely in Rainy Conditions',
    slug: 'drive-safely-rainy-conditions',
    excerpt:
      'Essential tips for maintaining control on wet roads, including proper following distance and braking techniques.',
    category: 'Road Safety',
    imageUrl:
      'https://images.unsplash.com/photo-1519692933481-162789dd5129?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 4,
    country: 'United Kingdom',
    publishedAt: new Date('2024-05-14'),
    isPublished: true,
  },
  {
    title: 'Understanding Right-of-Way Rules',
    slug: 'understanding-right-of-way-rules',
    excerpt:
      'A comprehensive guide to right-of-way at intersections, roundabouts, and pedestrian crossings.',
    category: 'Traffic Laws',
    imageUrl:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 5,
    country: 'Canada',
    publishedAt: new Date('2024-05-12'),
    isPublished: true,
  },
  {
    title: 'AI Dashcams: The Future of Road Safety',
    slug: 'ai-dashcams-future-road-safety',
    excerpt:
      'How artificial intelligence in dashcams is revolutionizing driver monitoring and accident prevention.',
    category: 'AI & Automotive',
    imageUrl:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 6,
    country: 'United States',
    publishedAt: new Date('2024-05-10'),
    isPublished: true,
  },
  {
    title: 'New Parking Regulations in Downtown Area',
    slug: 'new-parking-regulations-downtown',
    excerpt:
      'Updated parking zones and time limits take effect next month. Here is what drivers need to know.',
    category: 'Traffic News',
    imageUrl:
      'https://images.unsplash.com/photo-1506521781263-d8422e94f995?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 3,
    country: 'Germany',
    publishedAt: new Date('2024-05-08'),
    isPublished: true,
  },
  {
    title: 'Winter Driving Tips for Beginners',
    slug: 'winter-driving-tips-beginners',
    excerpt:
      'Prepare for icy roads with these essential winter driving techniques and vehicle preparation tips.',
    category: 'Road Safety',
    imageUrl:
      'https://images.unsplash.com/photo-1516436775489-367f0cf0754a?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 4,
    country: 'Canada',
    publishedAt: new Date('2024-05-06'),
    isPublished: true,
  },
  {
    title: 'Lane Departure Warning Systems Explained',
    slug: 'lane-departure-warning-systems',
    excerpt:
      'Modern ADAS features help prevent accidents. Learn how lane departure warnings work and when to trust them.',
    category: 'AI & Automotive',
    imageUrl:
      'https://images.unsplash.com/photo-1489824904134-891ab84532f1?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 5,
    country: 'United States',
    publishedAt: new Date('2024-05-04'),
    isPublished: true,
  },
  {
    title: 'Updated Highway Code for 2024',
    slug: 'updated-highway-code-2024',
    excerpt:
      'Key changes to the highway code including new rules for cyclists, pedestrians, and electric vehicles.',
    category: 'Traffic Laws',
    imageUrl:
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 7,
    country: 'United Kingdom',
    publishedAt: new Date('2024-05-02'),
    isPublished: true,
  },
  {
    title: 'Pedestrian Crosswalk Safety Campaign Launches',
    slug: 'pedestrian-crosswalk-safety-campaign',
    excerpt:
      'National campaign raises awareness about yielding to pedestrians at marked and unmarked crosswalks.',
    category: 'Road Safety',
    imageUrl:
      'https://images.unsplash.com/photo-1519003729264-11996aac4f41?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 3,
    country: 'France',
    publishedAt: new Date('2024-04-30'),
    isPublished: true,
  },
  {
    title: 'Electric Vehicle Charging Lane Rules',
    slug: 'ev-charging-lane-rules',
    excerpt:
      'New regulations clarify who can use EV charging lanes and penalties for misuse by non-electric vehicles.',
    category: 'Traffic Laws',
    imageUrl:
      'https://images.unsplash.com/photo-1593941707882-a5bba14938ce?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 4,
    country: 'Germany',
    publishedAt: new Date('2024-04-28'),
    isPublished: true,
  },
  {
    title: 'Night Driving: Visibility and Headlight Use',
    slug: 'night-driving-visibility-headlights',
    excerpt:
      'Improve your night driving safety with proper headlight settings, anti-glare techniques, and fatigue management.',
    category: 'Road Safety',
    imageUrl:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 5,
    country: 'Poland',
    publishedAt: new Date('2024-04-26'),
    isPublished: true,
  },
  {
    title: 'Traffic Congestion Pricing Starts in Major Cities',
    slug: 'traffic-congestion-pricing-major-cities',
    excerpt:
      'Several cities introduce congestion pricing to reduce traffic during peak hours. See how it affects your commute.',
    category: 'Traffic News',
    imageUrl:
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 4,
    country: 'United States',
    publishedAt: new Date('2024-04-24'),
    isPublished: true,
  },
  {
    title: 'Self-Driving Cars: Current Legal Status',
    slug: 'self-driving-cars-legal-status',
    excerpt:
      'An overview of autonomous vehicle regulations across different countries and what drivers should expect.',
    category: 'AI & Automotive',
    imageUrl:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 8,
    country: 'United States',
    publishedAt: new Date('2024-04-22'),
    isPublished: true,
  },
  {
    title: 'School Zone Speed Limits: What You Need to Know',
    slug: 'school-zone-speed-limits',
    excerpt:
      'School zone speed limits are strictly enforced. Learn the rules, times, and penalties for violations.',
    category: 'Traffic Laws',
    imageUrl:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 3,
    country: 'Canada',
    publishedAt: new Date('2024-04-20'),
    isPublished: true,
  },
  {
    title: 'Distracted Driving Statistics for 2024',
    slug: 'distracted-driving-statistics-2024',
    excerpt:
      'Latest data shows phone use remains the leading cause of distracted driving incidents nationwide.',
    category: 'Traffic News',
    imageUrl:
      'https://images.unsplash.com/photo-1511919886586-b716af265bd8?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 4,
    country: 'United States',
    publishedAt: new Date('2024-04-18'),
    isPublished: true,
  },
  {
    title: 'Defensive Driving Course Benefits',
    slug: 'defensive-driving-course-benefits',
    excerpt:
      'Taking a defensive driving course can lower insurance premiums and improve your safety score.',
    category: 'Road Safety',
    imageUrl:
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 5,
    country: 'United Kingdom',
    publishedAt: new Date('2024-04-16'),
    isPublished: true,
  },
  {
    title: 'Roundabout Navigation: Common Mistakes',
    slug: 'roundabout-navigation-mistakes',
    excerpt:
      'Avoid the most common roundabout errors including wrong lane choice and failure to yield.',
    category: 'Traffic Laws',
    imageUrl:
      'https://images.unsplash.com/photo-1506521781263-d8422e94f995?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 4,
    country: 'Germany',
    publishedAt: new Date('2024-04-14'),
    isPublished: true,
  },
  {
    title: 'Smart Traffic Lights Coming to Your City',
    slug: 'smart-traffic-lights-your-city',
    excerpt:
      'AI-powered traffic lights adapt to real-time traffic flow, reducing wait times and emissions.',
    category: 'AI & Automotive',
    imageUrl:
      'https://images.unsplash.com/photo-1519003729264-11996aac4f41?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 5,
    country: 'France',
    publishedAt: new Date('2024-04-12'),
    isPublished: true,
  },
  {
    title: 'Motorcycle Safety Awareness Month',
    slug: 'motorcycle-safety-awareness-month',
    excerpt:
      'Drivers and riders share responsibility on the road. Key tips for safely sharing lanes with motorcycles.',
    category: 'Road Safety',
    imageUrl:
      'https://images.unsplash.com/photo-1558981403-c5f9899a5762?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 3,
    country: 'United States',
    publishedAt: new Date('2024-04-10'),
    isPublished: true,
  },
  {
    title: 'New DUI Penalties Take Effect',
    slug: 'new-dui-penalties',
    excerpt:
      'Stricter DUI laws include mandatory ignition interlock devices and longer license suspensions.',
    category: 'Traffic Laws',
    imageUrl:
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 6,
    country: 'United States',
    publishedAt: new Date('2024-04-08'),
    isPublished: true,
  },
  {
    title: 'Highway Construction Zones: Safety Guide',
    slug: 'highway-construction-zones-safety',
    excerpt:
      'Navigate construction zones safely with reduced speeds, lane changes, and worker awareness tips.',
    category: 'Traffic News',
    imageUrl:
      'https://images.unsplash.com/photo-1581092160562-40aa08f7881a?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 4,
    country: 'Canada',
    publishedAt: new Date('2024-04-06'),
    isPublished: true,
  },
  {
    title: 'Blind Spot Detection Technology Review',
    slug: 'blind-spot-detection-review',
    excerpt:
      'We compare the latest blind spot monitoring systems and how they integrate with driver awareness.',
    category: 'AI & Automotive',
    imageUrl:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 7,
    country: 'Germany',
    publishedAt: new Date('2024-04-04'),
    isPublished: true,
  },
  {
    title: 'Child Car Seat Regulations Updated',
    slug: 'child-car-seat-regulations-updated',
    excerpt:
      'New guidelines for rear-facing seats and booster requirements aim to better protect young passengers.',
    category: 'Road Safety',
    imageUrl:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 5,
    country: 'United Kingdom',
    publishedAt: new Date('2024-04-02'),
    isPublished: true,
  },
  {
    title: 'Toll Road Electronic Payment Expansion',
    slug: 'toll-road-electronic-payment',
    excerpt:
      'More highways are going cashless. Learn how to set up electronic toll accounts and avoid penalties.',
    category: 'Traffic News',
    imageUrl:
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 3,
    country: 'Poland',
    publishedAt: new Date('2024-04-01'),
    isPublished: true,
  },
];

const seedNews = async () => {
  await initMongoConnection();

  let upserted = 0;
  for (const article of seedArticles) {
    const result = await News.updateOne(
      { slug: article.slug },
      { $set: article },
      { upsert: true },
    );
    if (result.upsertedCount > 0 || result.modifiedCount > 0) {
      upserted += 1;
    }
  }

  const total = await News.countDocuments();
  console.log(`Seeded/updated ${upserted} articles. Total in DB: ${total}.`);
  await mongoose.disconnect();
};

seedNews().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
