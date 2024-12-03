import { sendFriendReq,respondToFriendReq,getFriendsOfUser,getPendingRequests,toggle } from "./friendRepo.js";

export const sendReq = async(req,res) =>{
    const id = req.params.id;
    const user = req._id;
    const request = await sendFriendReq(id,user);
    if(request.success){
        res.status(200).send(request);
    }else{
        res.status(400).send(request)
    }
}

export const respondToFriendrequest = async(req,res) =>{
    const reqId = req.params.id;
    const userId = req._id;
    const response = req.query.response;
    if(response === 'accept' || response === 'reject'){
        const resonreq = await respondToFriendReq(reqId,userId,response);
        if(resonreq.success){
            res.status(200).send(resonreq);
        }
    }else{
        res.status(400).send('Invalid response')
    }
    
}

export const getFriendsofUser = async(req,res) =>{
    const userId = req.params.id;
    const friends = await getFriendsOfUser(userId);
    if(friends.success){
        res.status(200).send(friends);
    }else{
        res.status(400).send(friends);
    }
}

export const getPending = async(req,res) =>{
    const userId = req._id;
    const pending = await getPendingRequests(userId);
    if(pending.success){
        res.status(200).send(pending);
    }else{
        res.status(400).send(pending);
    }
}

export const toggleFriendship = async(req,res) =>{
    const userId = req._id;
    const friendId = req.params.id;
    const toggleFriend = await toggle(userId,friendId);
    if(toggleFriend.success){
        res.status(200).send(toggleFriend);
    }else{
        res.status(400).send(toggleFriend);
    }
}