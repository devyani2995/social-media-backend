const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    imageURL: { type: String },
    linkURL: { type: String },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like',
        },
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
},{
    timestamps:true
});

// Add a pre-save hook to update `updatedAt` on changes
// postSchema.pre('save', function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
