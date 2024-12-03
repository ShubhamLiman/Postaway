import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  to:{
    type:mongoose.Types.ObjectId,
    ref:"User",
    required:true
  },
  from:{
    type:mongoose.Types.ObjectId,
    ref:"User",
    required:true
  },
  status:{
    type:String,
    enum:["pending","accepted","rejected"],
  }
});

export const requestModel = mongoose.model('Request',requestSchema);