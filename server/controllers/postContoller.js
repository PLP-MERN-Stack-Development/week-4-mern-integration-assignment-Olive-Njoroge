// controllers/postController.js

const Post = require('../models/Post');

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
};

// Get one post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch post",
      error: error.message,
    });
  }
};

// Create a post
exports.createPost = async (req, res) => {
  try {
    const { title, content, author, category } = req.body;

    if (!title || !content || !author || !category) {
      return res.status(400).json({
        message: "Title, content, author, and category are required",
      });
    }

    const post = new Post({
      title,
      content,
      author: author.trim(),
      category: category.trim(),
    });

    await post.save(); // Pre-save hook creates slug
    res.status(201).json(post);
  } catch (error) {
    console.error("❌ Failed to create post:", error);
    res.status(500).json({
      message: "Failed to create post",
      error: error.message,
    });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedPost = await Post.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update post",
      error: error.message,
    });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete post",
      error: error.message,
    });
  }
};
