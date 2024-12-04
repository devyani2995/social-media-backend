const mongoose = require('mongoose');

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // User who is following
      required: true,
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // User being followed
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

module.exports = mongoose.model('Follow', followSchema);
