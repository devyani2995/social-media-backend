const { addLikeRepository, removeLikeRepository } = require('../repository/likeRepository.js');

// Add a like to a post
const addLikeController = async (req, res) => {
    try {
        const { postId } = req.body;
        const userId = req.user.id;

        // Add a like using the repository
        const newLike = await addLikeRepository(userId, postId);

        res.status(201).json(newLike);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Remove a like from a post
const removeLikeController = async (req, res) => {
    try {
        const { postId } = req.body;
        const userId = req.user.id;

        // Remove a like using the repository
        const removedLike = await removeLikeRepository(userId, postId);

        if (!removedLike) {
            return res.status(404).json({ message: 'Like does not exist.' });
        }

        res.status(200).json({ message: 'Like removed successfully.', removedLike });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    addLikeController,
    removeLikeController,
};
