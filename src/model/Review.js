import mongoose from 'mongoose';

// Defining a schema for Business
const Schema = new mongoose.Schema({

  review_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  business_id: {
    type: String,
    required: true,
    index: true,
  },
  date: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  useful: {
    type: Number,
    required: true,
  },
  funny: {
    type: Number,
    required: true,
  },
  cool: {
    type: Number,
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
  collection: 'reviews',
});

export default mongoose.model('Review', Schema);
