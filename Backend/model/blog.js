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
  comments: {
    type: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comment: { type: String, required: true },
      },
    ],
    default: [], // Initialize to an empty array
  },
  category: {
    type: String, 
    enum: ['Tech', 'Health', 'Lifestyle', 'Education', 'Travel'],
    required: true, 
  },
  
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

module.exports = mongoose.model('Blog', blogSchema);
