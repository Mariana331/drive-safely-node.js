import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    category: {
      type: String,
      enum: [
        'Traffic News',
        'Road Safety',
        'Traffic Laws',
        'AI & Automotive',
        'New Law',
        'Update',
        'Reminder',
      ],
      required: true,
    },
    imageUrl: { type: String, default: '' },
    readTimeMinutes: { type: Number, default: 3 },
    country: { type: String, default: 'All Countries' },
    publishedAt: { type: Date, required: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const News = mongoose.model('News', newsSchema);
