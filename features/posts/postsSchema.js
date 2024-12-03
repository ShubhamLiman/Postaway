import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userID:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User"
  },
  userName:{
    type:String,
    required:true
  },
  caption:{
    type:String,
    required:true,
  },
  image:{
    type: String,
    required:true
  },
  interactions:{
    likes:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Like"
    }],
    comments:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Comment"
    }]
  }
},
{}
);

export const postModel = mongoose.model('Post',postSchema);