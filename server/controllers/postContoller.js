const Post = require('../models/Post');
//Get all post
exports.getAllPosts = async (req, res) => {
    try{
        const posts = await Post.find().populate('author category');
        res.status(200).json(posts);
    }catch(error){
        res.status(500).json({message: "Failed to fetch posts", error: error.message});
    }
};

//Get one post
exports.getPostById = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id).populate('author category');
        res.status(200).json(post);
    }catch(error){
        res.status(500).json({message: "Failed to fetch post", error: error.message});
    }
};

//Create a post
exports.createPost = async (req, res) => {
    try{
        const newPost = await Post.create({...req.body, author: req.user.id});          // assumes protect middleware has set req.user
        res.status(201).json(newPost);

    }catch(error){
        res.status(500).json({message: "Failed to create post"});
    }
}

//Update a post
exports.updatePost = async (req, res) => {
    try{
        const {id} = req.params //Post Id from URL
        const updates = req.body;   // the fields to update
        const updatedPost = await Post.findByIdAndUpdate(id,updates, { new: true, runValidators: true });

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(updatedPost);
    }catch(error){
        res.status(500).json({message: "Failed to update post"});
    }
}

// Delete post
exports.deletePost = async (req, res) => {
    try{
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
          }
        res.status(200).json({message: "Post deleted successfully"});
        
    }catch(error){
        res.status(500).json({message: 'Failed to delete post'});
    }
}
