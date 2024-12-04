const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        parentComment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment', // Reference to the parent comment (null if it’s a top-level comment)
          },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post', // Reference to the Post model
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt`
    }
);

module.exports = mongoose.model('Comment', commentSchema);
