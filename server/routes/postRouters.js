const express = require('express');
const {getAllPosts, getPostById, createPost, updatePost, deletePost} = require('../controllers/postContoller');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;