const User = require('../model/user');
const Blog = require('../model/blog');


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
};

const likeBlogs = async(req,res)=>{
    try {
         
         const user = req.user
         const{blogId} = req.params;
         console.log(blogId);
         console.log("User", user);
         
         
          // Check if the user is logged in
         if(!user){
            return res.status(401).json({ msg: "Unauthorized: User not logged in" })
         }
        //  Find the Blog by Id
        const blog = await Blog.findById(blogId);
        console.log(blog , "this is Blog");
        
        // Check if the Blog exists
        if(!blog){
            return res.status(404).json({ msg: "Blog not found" });
        }
         // Check if the user's role is "reader"
        if (user.role !== 'reader') {
            return res.status(403).json({
             success: false,
             message: 'Forbidden: Only readers can like blogs',
           });
        }
        const hasLiked = blog.likes.includes(user._id);
          // Check if the user has already liked the blog
        if (hasLiked) {
            return res.status(400).json({
              success: false,
              message: 'User has already liked this blog',
            });
        }
        blog.likes.push(user._id);
        await blog.save();
        return res.status(200).json({msg:"Blog liked successfully"});
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
          success: false,
          message: 'Error fetching users',
          error: error.message,
        });
    }
}
module.exports = {createBlog , likeBlogs}