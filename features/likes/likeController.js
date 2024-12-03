import { toggleLike,getAlllikes } from "./likeRepo.js";

export const togglelike = async(req,res) =>{
    const {id} = req.params;
    const userId = req._id;

    const liked = await toggleLike(id,userId);

    if(liked.success){
        res.status(200).send(liked.message);
    }else{
        res.status(400).send(liked.message);
    }
}

export const getLikes = async(req,res) =>{
    const id = req.params.id;
    
    const likes = await getAlllikes(id);

    if(likes.success){
        res.status(200).send({message:likes.message,likes:likes.likes});
    }else{
        res.status(400).send(likes.message)
    }
}