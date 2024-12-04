const User = require('../model/user');
const Blog = require('../model/blog');
const authenticate = require('../middleware/auth');


const createBlog = async(req,res)=>{
    try {
        const user = req.user
        if (!user) {
            return res.status(401).json({
              success: false,
              message: 'Unauthorized: User not logged in',
            });
          }
    //   if cheack the user As the Auther Role 
         if (user.role !== 'author') {
            return res.status(403).json({
                success: false,
                message: 'Forbidden: Only Authors can create blogs', })
         } 
         const {title , content} =req.body;
        //  valide the All inputs 
        if(!title || !content){
            return res.status(400).json({ msg:"Title & Content is required" })
        }
        // creating a New Blog
        const newBlog = await Blog(
            {
                title , 
                content , 
                author : user._id
            }
        );
       await newBlog.save();
       res.status(201).json({ msg: "Blog created successfully", newBlog });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
          success: false,
          message: 'Error fetching users',
          error: error.message,
        });
    }
}