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
  active: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
  collection: 'user',
});

export default mongoose.model('Business', Schema);
