
import { addPost,postById,getPostsofUser,getAllPosts,updatepost,deletepost } from "./postRepo.js";
export const createPost = async(req,res) =>{
    const userid = req._id;
    
    const caption = req.body.caption; 
    let image = req.file ? req.file.path : "No Url";

    try{
        const createpost = await addPost(userid,caption,image);
        if(createpost.success){
            res.status(201).send({ message: createpost.message, post:createpost.post});
        }else{
            res.status(400).send({ message: createpost.message });
        }
    }catch(err){
        console.log(err);
        res.status(400).send({ message: err.message });
    }
}

export const retriveById = async(req,res) =>{
    const id = req.params.id;
    try{
        const post = await postById(id);
        if(post.success){
            res.status(200).send({ message: post.message, post:post.post});
        }else{
            res.status(404).send({ message: post.message });
        }
    }catch(err){
        console.log(err);
        res.status(404).send({ message: err.message });
    }
}

export const allPosts = async(req,res) =>{
    try{
        const posts = await getAllPosts();
        if(posts.success){
            res.status(200).send({ message: posts.message, posts:posts.posts});
        }else{
            res.status(404).send({ message: posts.message });
        }
    }catch(err){
        console.log(err);
        res.status(404).send({ message: err.message });
    }
}

export const postOfuser = async(req,res) =>{
    const userid = req._id;
    const userPosts = await getPostsofUser(userid);
    if(userPosts.success){
        res.status(200).send({ message: userPosts.message, posts:userPosts.posts});
    }else{
        res.status(404).send({ message: userPosts.message });
    }
}

export const updatePost = async(req,res) =>{
    try{
        const id = req.params.postId;
    // console.log(req.body.caption);
    
        const userid = req._id;
        const caption = req.body.caption;
        let image = req.file ? req.file.path : null;
        const update = await updatepost(id,userid,caption,image);
        if(update.success){
            res.status(200).send({ message: update.message, post:update.post});
        }else{
            res.status(404).send({ message: update.message });
        }
    }catch(err){
        console.log(err);
        res.status(404).send({ message: err.message });
    }
}

export const deletePost = async(req,res) =>{
    const id =req.params.postId;
    const userid = req._id;
    // console.log(userid);
    // console.log(typeof(id));
    try{
        const deleatedPost = await deletepost(id,userid);
        if(deleatedPost.success){
            res.status(200).send({ message: deleatedPost.message, post:deleatedPost.post});
        }else{
            res.status(404).send({ message: deleatedPost.message });
        }
    }catch(err){
        console.log(err);
        res.status(404).send({ message: err.message });
    }
}