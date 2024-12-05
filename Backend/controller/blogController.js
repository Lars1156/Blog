const User = require('../model/user');
const Blog = require('../model/blog');


const createBlog = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: User not logged in',
      });
    }

    if (user.role !== 'author') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Only Authors can create blogs',
      });
    }

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and Content are required' });
    }

    // Creating a new blog with empty comments
    const newBlog = new Blog({
      title,
      content,
      author: user._id,
      comments: [], // Set default empty comments
    });

    await newBlog.save();

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      blog: newBlog,
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating blog',
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
};
// Commite Controller by The User to Blog
const addComment = async (req, res) => {
  try {
    const user = req.user;
    const { blogId } = req.params;
    const { comment } = req.body;

    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized: User not logged in' });
    }

    if (!comment || comment.trim() === '') {
      return res.status(400).json({ success: false, message: 'Comment cannot be empty' });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    blog.comments.push({ user: user._id, comment });
    await blog.save();

    res.status(200).json({
      success: true,
      message: 'Comment added successfully',
      blog,
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding comment',
      error: error.message,
    });
  }
};

// upadting the blog by the Author 
const upadteBlog = async (req, res) => {
  try {
       const user = req.user;
       const { blogId } = req.params;
       const { title, content } = req.body;
       // Ensure the user is logged in
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: User not logged in',
      });
    };
    // Ensure the blog exists
     const blog = await Blog.findById(blogId);
     if (!blog) {
       return res.status(404).json({ msg:"blog not found" });
     }
     // Ensure the logged-in user is the author of the blog
     if (String(blog.author) !== String(user._id)) {
        return res.status(403).json({
        success: false,
        message: 'Forbidden: Only the author can update this blog',
       });
     };
     // Update the blog
      // Update the fields if provided
    if (title) blog.title = title;
    if (content) blog.content = content;

    // Save the updated blog
    const updatedBlog = await blog.save();
     res.status(200).json({ msg:"blog updated successfully"  , upadteBlog});
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding comment',
      error: error.message,
    });
  }
};
// delete the Blog by the Author Controller 
const deleteBlog = async (req, res) => {
  try {
         const user = req.user;
         const{blogId} = req.params;
         // Ensure the user is logged in
         if (!user) {
           return res.status(401).json({ msg:"user is not Found"});
         }
         // Ensure the blog exists
         const blog = await Blog.findById(blogId);
         if (!blog) {
           return res.status(404).json({ msg:"blog not found" });
         }
         if((String (blog.author) !== String(user._id))){
          return res.status(403).json({
            success: false,
            message: 'Forbidden: Only the author can delete this blog',
          });
         }
         await Blog.findByIdAndDelete(blogId);

         res.status(200).json({ msg:"blog deleted successfully" });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding comment',
      error: error.message,
    });
  }
};
const getAllBlog = async (req, res) => {
   try {
        const blogs = await Blog.find().populate('author' , 'userName , email') ;
        if(blogs === 0){
          return res.status(404).json({ msg:"No blogs found" });
        }
        res.status(200).json({
          success: true,
          message: 'Blogs fetched successfully',
          blogs,
        });
   } catch (error) {
    console.error('Error adding comment:', error);
      res.status(500).json({
      success: false,
      message: 'Error adding comment',
      error: error.message,
    });
   }
};
// getAllBolgAuther created by the all userss
const getAllBlogAuther = async (req, res) => {
  try {
       const blogs = await Blog.find().populate('author' , 'userName , email') ;
       if (!blogs || blogs.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No blogs found',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Blogs fetched successfully',
        blogs: blogs,
      });  
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blogs',
      error: error.message,
    });
  }
}

module.exports = {createBlog , likeBlogs , addComment , upadteBlog ,deleteBlog, getAllBlog, getAllBlogAuther};