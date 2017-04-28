import mongoose from 'mongoose';

// Defining a schema for Business
const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  likesCount: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
    index: true,
  },
  business_id: {
    type: String,
    required: true,
    index: true,
  },
  reviews: {
    type: Array,
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
  collection: 'businesses',
});

export default mongoose.model('Business', Schema);
