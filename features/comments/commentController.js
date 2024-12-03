import { addcomment,getComments,updateComment,deleteComment } from "./commentRepo.js";

export const addComment = async(req,res) =>{
  
    const{comment} = req.body;
    const userId = req._id;
    const postId = req.params.postId;

    const add = await addcomment(comment,userId,postId);
    if(add.success){
        res.status(200).send({message:add.message,comment:add.comment});
    }else{
        res.status(400).send({message:add.message});
    }

}

export const getCommentsonPost = async(req,res) =>{
    const postId = req.params.postId;
    const comments = await getComments(postId);
    if(comments.success){
        res.status(200).send({message:comments.message,comments:comments.comments});
    }else{
        res.status(400).send({message:comments.message});
    }
}

export const updateCommentControl = async(req,res) =>{
    const commentId = req.params.commentId;
    const userId = req._id;
    const comment = req.body.comment;

    const updated = await updateComment(comment,commentId,userId);

    if(updated.success){
        res.status(200).send({message:updated.message,comment:updated.newComment});
    }else{
        res.status(400).send({message:updated.message});
    }
}

export const delComment = async(req,res) =>{
    
    const commentId = req.params.commentId;
    const userId = req._id;

    const deleted = await deleteComment(commentId,userId);
    if(deleted.success){
        res.status(200).send({message:deleted.message,comment:deleted.comment});
    }else{
        res.status(400).send({message:deleted.message});
    }
}