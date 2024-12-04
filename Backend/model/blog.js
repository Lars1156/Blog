const mongoose = require('mongoose'); 

const blogSchema = new mongoose.Schema({
  title: {
    type: String, // Corrected type declaration (no quotes)
    required: true
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, // Correctly reference ObjectId
    ref: 'User', // Reference to the User model
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId, // Array of User references for likes
      ref: 'User',
    },
  ],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User reference
      comment: { type: String, required: true }, // Actual comment text
    },
  ],
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

module.exports = mongoose.model('Blog', blogSchema);
