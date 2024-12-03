
import { requestModel } from "./reqSchema.js";
import { userModel } from "../users/userSchema.js";
import { customErrorHandler } from "../../middlewares/errorHandlerMiddleware.js";
export const sendFriendReq = async(id,userId) =>{
    try{
        const to = await userModel.findById(id);
        const from = await userModel.findById(userId);
        
        if(id == userId){
            throw new customErrorHandler(400,"you cannot send friend request to yourself")
        }
        if(to.friends.includes(userId) && from.friends.includes(id)){
           throw new customErrorHandler(400,`You are already friends with ${to.name}`)
        }
        if(to){
            
            const request = await requestModel.findOne({to:id,from:userId});
            
            if(!request){
                const newReq = new requestModel({to:id,from:userId,status:'pending'});
                const savedReq = await newReq.save();
                await to.receivedRequests.push(savedReq._id);
                await from.sentRequests.push(savedReq._id)
                await to.save();
                await from.save();
                return{success:true,message:"friend request sent",request:savedReq};
            }else{
                throw new customErrorHandler(400,`You have alredy sent friend request to ${to.name}`)
            }
        }
    }catch(err){
        console.log(err);
        return {success:false,message:"something went wrong"};
    }
}

export const respondToFriendReq = async(id,userId,response) =>{
    try{
        const user =await userModel.findById(userId).select("-password -mobile -email -posts -age ");
        
        const request = await userModel.findOne({receivedRequests:id}).select("receivedRequests _id");
        const reqDetails = await requestModel.findById(id);
        if(reqDetails.status != 'pending'){
            throw new customErrorHandler(400,"you alredy responded to this request")
        }
        
        const reqFrom = reqDetails.from;
        const reqTo = reqDetails.to;
        if(request){
            if(response == 'accept'){
                
                reqDetails.status ='accepted';
                await reqDetails.save();

                const receiver = await userModel.findById(reqTo);
                receiver.friends.push(reqFrom);
                await receiver.save();
        
                // Add the receiver to the sender's friend list
                const sender = await userModel.findById(reqFrom);
                sender.friends.push(reqTo);
                await sender.save();
        
                // Remove the request from the receiver's received requests and the sender's sent requests
                receiver.receivedRequests.pull(id);
                sender.sentRequests.pull(id);
                await receiver.save();
                await sender.save();
        
                return { success: true, message: "Friend request accepted" };  
            }else if(response === "reject"){
                const reqDetails = await requestModel.findOneAndDelete({_id:id});
                const receiver = await userModel.findById(reqTo);
                const sender = await userModel.findById(reqFrom);
                receiver.receivedRequests.pull(id);
                sender.sentRequests.pull(id);
                await receiver.save();
                await sender.save();

                return { success: true, message: "Friend request rejected" };
            }else{
               throw new customErrorHandler(400,"Invalid response");
            }
            
        }else{
           throw new customErrorHandler(400,"request not found");
        }

    }catch(err){
        return err.message;
    }
}

export const getFriendsOfUser = async(id) =>{
    try{
        const user = await userModel.findById(id);
        if(user){
            const friends = user.friends;
            return {success:true,message:`Friend's List of ${user.name}`,friends:friends};
        }else{
           throw new customErrorHandler(400,"user not found")
        }
    }catch(err){
        return err.message;
    }
}

export const getPendingRequests = async(id) =>{
    try{
        const user = await userModel.findById(id);
        if(user){
            const pendingRequests = user.receivedRequests;
            return {success:true,message:`Pending Requests of ${user.name}`,pendingRequests:pendingRequests};
        }else{
            throw new customErrorHandler(400,"user not found")
        }
    }catch(err){
        return err.message;
    }
}

export const toggle = async(userId,friendId) =>{
    try{
        const user = await userModel.findById(userId);
        const friend = await userModel.findById(friendId);
        
        if(user && friend){
            if(user.friends.includes(friendId) && friend.friends.includes(userId)){
                user.friends.pull(friendId);
                friend.friends.pull(userId);
                await user.save();
                await friend.save();
                return {success:true,message:`Unfriended ${friend.name}`}
            }
        }else{
            throw new customErrorHandler(400,"user not found")
        }
    }catch(err){
        return err.message;
    }
}