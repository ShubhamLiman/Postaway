import mongoose from "mongoose";
import { otpSchema } from "./otpSchema.js";



const otpModel = mongoose.model('Otp',otpSchema)
export const storeOtp = async(data) =>{
    const {otp,email} = data;
    
    try{
        const otpDetails = new otpModel(data);
        await otpDetails.save();
    }catch(err){
        return err.message;
    }
}

export const Verifyotp = async(email,otp)=>{
    const verification = await otpModel.findOne({email:email,otp:otp});
    // console.log(verification +" "+ otp);
    return verification?true:false;
    
}

export const deleteOtp = async(email,otp) =>{
    const verification = await otpModel.findOneAndDelete({email:email,otp:otp});
    // console.log(verification);
    return verification?true:false;
}