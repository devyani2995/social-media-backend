const Post = require('../models/post');

// Create a post
const createPostRepository = async (userId, content, imageURL, linkURL) => {
    const newPost = await Post.create({
        user: userId,
        content,
        imageURL,
        linkURL
    });
    return newPost.save();
};

// Get all posts
const getAllPostsRepository = async () => {
    return await Post.find()
        .populate('user', 'email') // Populate the user fiels with only email
};

// Get a post by ID
const getPostByIdRepository = async (postId) => {
    return await Post.findById(postId).populate('user', 'email');
};

// Update a post
const updatePostRepository = async (postId, updatedFields) => {
    return await Post.findByIdAndUpdate(postId, updatedFields, { new: true });
};

// Delete a post
const deletePostRepository = async (postId) => {
    return await Post.findByIdAndDelete(postId);
};

// Bulk create posts
const createBulkPostsRepository = async (posts) => {
    return await Post.insertMany(posts);  // insertMany inserts multiple documents at once
};

module.exports = {
    createPostRepository,
    getAllPostsRepository,
    getPostByIdRepository,
    updatePostRepository,
    deletePostRepository,
    createBulkPostsRepository
};
