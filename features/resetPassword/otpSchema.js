import mongoose from "mongoose";

export const otpSchema = new mongoose.Schema({
 otp:{
    type:Number,
    required:true
 },
 email:{
    type:String,
    required:true
 }
});
