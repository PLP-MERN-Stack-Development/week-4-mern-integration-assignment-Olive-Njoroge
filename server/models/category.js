const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,   // ✅ fixed typo from 'require' to 'required'
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
}, { timestamps: true });

// ✅ Prevent OverwriteModelError on hot reload
module.exports = mongoose.models.Category || mongoose.model("Category", categorySchema);
