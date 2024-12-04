const Post = require('../models/post');
const PostRepository = require('../repository/postRepository');
const Like = require('../../likes/models/like');

// Create a new post
exports.createPost = async (req, res) => {
    try {
        const { content, imageURL, linkURL } = req.body;
        const userId = req.user.id; // Assuming JWT authentication adds user ID to the request object

        // Call the repository method to create the post
        const newPost = await PostRepository.createPostRepository(userId, content, imageURL, linkURL);
        await Post.populate(newPost,{path:'user',select:'email'});
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        // Fetch all posts from the repository
        const posts = await PostRepository.getAllPostsRepository();
    
        // For each post, count the likes and attach to the post object
        const postsWithLikes = await Promise.all(
          posts.map(async (post) => {
            const likeCount = await Like.countDocuments({ post: post._id });
            const currentUserLiked = await Like.exists({ post: post._id, user: req.user.id }); // Check if the user has liked the post
            return {
              ...post.toObject(), // Convert Mongoose document to plain object
              likeCount,
              currentUserLiked
            };
          })
        );
    
        res.status(200).json(postsWithLikes);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error: error.message });
      }
};

// Get a particular post by ID
exports.getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await PostRepository.getPostByIdRepository(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error: error.message });
    }
};

// Update a post
exports.updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const updatedFields = req.body;

        const post = await PostRepository.getPostByIdRepository(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Only allow the user who created the post to update it
        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to update this post' });
        }

        // Call the repository method to update the post
        const updatedPost = await PostRepository.updatePostRepository(postId, updatedFields);
        res.status(200).json({ updatedPost });
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error: error.message });
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await PostRepository.getPostByIdRepository(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        // Only allow the user who created the post to delete it
        if (post.user._id.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to delete this post' });
        }

        // Call the repository method to delete the post
        await PostRepository.deletePostRepository(postId);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
};

// Bulk create posts
exports.createBulkPosts = async (req, res) => {
  try {
    const { posts } = req.body;  // An array of post objects

    if (!Array.isArray(posts) || posts.length === 0) {
      return res.status(400).json({ message: 'Please provide an array of posts to create.' });
    }

    // Validate each post in the array
    posts.forEach(post => {
      if (!post.content) {
        throw new Error('Content is required for all posts');
      }
    });

    // Add userId to each post (Assume req.user is the logged-in user)
    const userId = req.user.id;
    const postsWithUserId = posts.map(post => ({
      ...post,
      user: userId
    }));

    // Create the posts in bulk using repository method
    const createdPosts = await PostRepository.createBulkPostsRepository(postsWithUserId);

    res.status(201).json({ posts: createdPosts });
  } catch (error) {
    res.status(500).json({ message: 'Error creating posts in bulk', error: error.message });
  }
};

