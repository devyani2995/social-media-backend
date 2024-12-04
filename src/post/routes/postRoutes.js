const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticateToken = require('../../auth/middleware/jwtMiddleware'); // Assuming JWT authentication middleware

//Middleware to protect routes
// router.use(authenticateToken);

// Route for creating a post
router.post('/',postController.createPost);

// Route for getting all posts
router.get('/', postController.getAllPosts);

// Route for getting a particular post by ID
router.get('/:id', postController.getPostById);

// Route for updating a post
router.put('/:id', postController.updatePost);

// Route for deleting a post
router.delete('/:id',postController.deletePost);

// Route for bulk creating posts
router.post('/bulk',postController.createBulkPosts);

module.exports = router;
