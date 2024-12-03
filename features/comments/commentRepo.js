import { commentModel } from "./commentSchema.js";
import { postModel } from "../posts/postsSchema.js";
import { customErrorHandler } from "../../middlewares/errorHandlerMiddleware.js";
export const addcomment = async(comment,userId,postId) =>{
    
    try{
        const findpost = await postModel.findById(postId);
        if(findpost){

            const newComment = new commentModel({text:comment,user:userId,post:postId});
            const result = await newComment.save();
            findpost.interactions.comments.push(result._id);
            await findpost.save();
            return {success:true,message:"comment added successfully",comment:result};
        }else{
            throw new customErrorHandler(400,"post not found")
        }
    }catch(err){
        console.log(err);
        
        return {success:false,message:err.message};
    }
}

export const getComments = async(postId) =>{

    try{
        const post = await postModel.findById(postId);
        if(post){
            const commentsIds = post.interactions.comments;
            const comments = [];
            for (const id of commentsIds) {
                const comment = await commentModel.findById(id);
                comments.push(comment);
            }
            return {success:true, message:"comments on post", comments};
        }else{
            throw new customErrorHandler(400,"post not found")
        }
    }catch(err){
        console.log(err);
        return{success:false,message:"something went wrong"}
        
    }
}

export const updateComment = async(comment,commentId,userId) =>{

    
    try{
        const cmt = await commentModel.findById(commentId);
        if(cmt){
            if(cmt.user == userId){
                if(comment){
                    cmt.text = comment;
                    const savedcmt = await cmt.save();
                    return{success:true,message:"comment updated", newComment:savedcmt};
                }else{
                    throw new customErrorHandler(400,"comment not provided")
                }
            }else{
                throw new customErrorHandler(400,"You are not the owner of the post")
            }
        }else{
            throw new customErrorHandler(400,"comment not found")
        }
    }catch(err){
        console.log(err);
        return{success:false,message:err.message}
    }

}

export const deleteComment = async(commentId,userId) =>{
    
    try{
        
        const cmt = await commentModel.findById(commentId);
        
        if(cmt){
            const post = await postModel.findById(cmt.post);
            if(cmt.user == userId){
                const deletedcomment = await commentModel.deleteOne({_id:commentId});
                post.interactions.comments = post.interactions.comments.filter((cmtId) => cmtId != commentId);
                await post.save();
                return {success:true, message:"comment deleted successfully",comment:deletedcomment};
            }else{
                throw new customErrorHandler(400,"You are not the owner of the post")
            }
        }else{
            throw new customErrorHandler(400,"comment not found")
        }
    }catch(err){
        console.log(err);
        return{success:false,message:"something went wrong"}
    }
}

export const getcomment = async(id) =>{
    try{
        const comment = await commentModel.findById(id);
        if(comment){
            return {success:true,comment:comment};
        }else{
            throw new customErrorHandler(400,"comment not found")
        }
    }catch(err){
        console.log(err);
        return{success:false,message:"something went wrong"}
    }
}