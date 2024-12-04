const mongoose = require('mongodb');
const blogSchema = new mongoose.Schema({
    title : {
        type : "String", 
        required: true
    },
    content : {
        type : "String",
        required: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    like : {
        type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    },
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            comment: { type: String, required: true },
        },
    ],
},{ timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);