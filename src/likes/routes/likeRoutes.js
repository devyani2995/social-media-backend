const express = require('express');
const router = express.Router();
const { addLikeController, removeLikeController } = require('../controllers/likesController');
const authenticateToken = require('../../auth/middleware/jwtMiddleware'); // Assuming JWT authentication middleware

//Middleware to protect routes
router.use(authenticateToken);

// Add a like to a post
router.post('/', addLikeController);

// Remove a like from a post
router.delete('/', removeLikeController);

module.exports = router;
