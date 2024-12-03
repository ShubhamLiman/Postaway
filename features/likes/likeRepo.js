import { likeModel } from "./likeSchema.js";
import { postModel } from "../posts/postsSchema.js";
import { commentModel } from "../comments/commentSchema.js";


export const toggleLike = async(id,userId) =>{
    try{
        const post = await postModel.findById(id);
        const cmt = await commentModel.findById(id);

        if(post){
            const like = await likeModel.findOne({user:userId,likeable:post._id,on_model:'Post'});
            if(like){
                await likeModel.deleteOne({user:userId,likeable:post._id,on_model:'Post'});
                await postModel.updateOne(
                    { _id: id },
                    { $pull: { "interactions.likes": like._id } }
                )
                return {success:true, message:"unliked post"};
            }else{
                const newLike = new likeModel({
                    user:userId,
                    likeable:post._id,
                    on_model:'Post',
                })
                const savedlike = await newLike.save();
                await post.interactions.likes.push(savedlike._id);
                await post.save();
                return {success:true,message:"liked Post"}
            }
        }
        else if(cmt){
            const like = await likeModel.findOne({user:userId,on_model:'Comment',likeable:cmt._id});
            if(like){
                await likeModel.deleteOne({user:userId,on_model:'Comment',likeable:cmt._id});

                await commentModel.updateOne(
                    { _id: id },
                    { $pull: { "likes": like._id } }
                )
                return {success:true, message:"unliked comment"};
            }else{
                const newLike = new likeModel({
                    user:userId,
                    likeable:cmt._id,
                    on_model:'Comment',
                })
                const savedlike = await newLike.save();
                await cmt.likes.push(savedlike._id);
                await cmt.save();
                return {success:true,message:"liked comment"}
            }
        }else{
            return {success:false,message:"post/comment not found"};
        }
    }catch(err){
        console.log(err);
        return{success:false,message:"post/comment not found"}
    }
}

export const getAlllikes = async(id) =>{
    try{
        const post = await postModel.findById(id);
        const cmt = await commentModel.findById(id);

        
        if(post){
            const likes = await likeModel.find({likeable:id,on_model:'Post'});
            return{success:true,message:"likes on post",likes:likes};
        }
        else if(cmt){
            const likes = await likeModel.find({likeable:id,on_model:'Comment'});
            return{success:true,message:"likes on Comment",likes:likes};
        }
        else{
            return {success:false,message:"post/comment not found"};
        }
    }catch(err){
        console.log(err);
        return {success:false,message:"something went wrong"};
    }
}