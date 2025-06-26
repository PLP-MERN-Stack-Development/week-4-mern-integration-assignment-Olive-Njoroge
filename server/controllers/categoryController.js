const Category = require('../models/category');

exports.getCategories = async (req, res) => {
    try{
        const categories = await Category.find({});
        res.status(200).json(categories);
    }catch(error){
        res.status(500).json({message: "Failed to fetch categories", error: error.message})
    }
}

exports.createCategory = async (req, res) => {
    try{
        const newCategory = await Category.create({...req.body});
        res.status(201).json(newCategory);
    }catch(error){
        res.status(500).json({message: "Failed to create category", error: error.message})
    }
}