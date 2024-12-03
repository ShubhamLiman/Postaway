import { postModel } from "./postsSchema.js";
import { userModel } from "../users/userSchema.js";
import { customErrorHandler } from "../../middlewares/errorHandlerMiddleware.js";

export const addPost = async(userID,caption,image) => {

    const user = await userModel.findById(userID);
    if (!user) {
       throw new customErrorHandler(400,"user not found or invalid response from")
    }
    const userName = user.name;
    
    try{
        const newPost = new postModel({userID,userName,caption,image});
        const savedPost = await newPost.save();
        user.posts.push(savedPost._id);
        await user.save();
        return {success:true,message:"Post created successfully",post:savedPost};
    }catch(err){
        console.log(err.message);
        
        return {success:false,message:err.message};
    }
}

export const postById = async(id) =>{
    const post = await postModel.findById(id);
    if(!post){
       throw new customErrorHandler(400,"post not found")
    }else{
        return {success:true,message:"Post found",post};
    }
}

export const getAllPosts = async()=>{
    try{
        const posts = await postModel.find();
        return {success:true,message:"Posts found",posts};
    }catch(err){
        throw new customErrorHandler(400,err.message)
    }
}

export const getPostsofUser = async (id) => {
    try {
        
        const posts = await postModel.find({ userID:id});
        if (posts.length === 0) {
            throw new customErrorHandler(400,"user posts not found");
        } else {
            return { success: true, message: "Posts found", posts };
        }
    } catch (err) {
        return { success: false, message: err.message };
    }
  }

export const updatepost = async(postid,userid,caption,image) =>{

    const post = await postModel.findById({_id:postid});
    if(post){
        if(post.userID == userid ){
            if(caption != undefined){
                post.caption = caption;
            }
            if(image != null){
                post.image = image;
            }
            const savedPost = await post.save()
            return {success:true, message:"post updated successfully",post:savedPost};
        }else{
            
            throw new customErrorHandler(400,"Unauthorized access")
            
        }
    }else{ 
        throw new customErrorHandler(400,"Post not found")
    }
}

export const deletepost = async(postid,userId) =>{

    const post  = await postModel.findById({_id:postid});
    const user = await userModel.findById(userId);
    if(post){
        if(post.userID == userId){
            const deletedPost = await postModel.deleteOne({_id:postid});
            user.posts = user.posts.filter((postId) => postId != postid);
            await user.save();
            return {success:true, message:"post deleted successfully",post:deletedPost};
        }else{
            throw new customErrorHandler(400,"Unauthorized access");
        }
    }else{
        throw new customErrorHandler(400,"post not found")
    }
    return post;
}