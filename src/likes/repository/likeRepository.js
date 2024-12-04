const Like = require('../models/like');

// Add a like to a post
const addLikeRepository = async (userId, postId) => {
    const existingLike = await Like.findOne({ user: userId, post: postId });
    if (existingLike) {
        throw new Error('User already liked this post.');
    }
    const newLike = new Like({ user: userId, post: postId });
    return await newLike.save();
};

// Remove a like from a post
const removeLikeRepository = async (userId, postId) => {
    const like = await Like.findOneAndDelete({ user: userId, post: postId });
    if (!like) {
        throw new Error('Like does not exist.');
    }
    return like;
};

// Count likes for a post
const countLikesForPost = async (postId) => {
  return await Like.countDocuments({ post: postId });
};

module.exports = {
    addLikeRepository,
    removeLikeRepository,
    countLikesForPost
};
