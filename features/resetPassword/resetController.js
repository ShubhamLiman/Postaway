import sendMail from '../../utils/sendMail.js';
import {findUser,resetPassword } from '../users/userRepository.js';
import { storeOtp,Verifyotp,deleteOtp } from './resetRepo.js';

let isVerified = false;
export const sendOtp = async(req,res) =>{
    const id = req._id;
    try{
      const user = await findUser(id);
      const email = user.res.email;
      if(user.success){
        const otp = Math.floor(100000 + Math.random() * 900000);
        storeOtp({otp,email});
        setTimeout(() => {
            deleteOtp(email,otp);
            isVerified = false;
        }, 600000);
        sendMail(email,otp);
        res.status(200).send(`OTP sent to ${email} successfully, OTP valid for 10 minutes`);
      }else{
        res.status(400).send({error:"Email not found"})
      }
    }catch(err){
      console.log(err);
      res.status(400).send({error:err.message})
    }   
}

export const verifyOtp = async(req,res) =>{
    const {otp} = req.body;
    const user = await findUser(req._id);
    const email = user.res.email;
    try{
        const verify = await Verifyotp(email,otp);
        // console.log(verify);
        
        if(verify){
            isVerified = true;
            res.status(200).send(`OTP verification successfull`);
        }else{
            res.status(400).send({error:"OTP verification unsuccessfull"})
        }
    }catch(err){
        console.log(err);
        res.status(400).send({error:err.message})
    }
}

export const resetpassword = async(req,res) =>{
  if(isVerified){
    const {newpassword} = req.body;
    // console.log(newpassword);
    const id = req._id
    const result = await resetPassword(id,newpassword);
    
    if(result.success===true){
      res.status(200).send({message:"Password reset successfully",user:result.res});
    }else{
      res.status(400).send({error:result.error});
    }
  }else{
    res.status(400).send({error:"Please verify your OTP first"})
  }
}