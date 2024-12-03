import bcrypt from "bcrypt";
import { userModel } from "./userSchema.js";
export const userRegisterationRepo = async (userData) => {
    try {
      const newUser = new userModel(userData);
      await newUser.save();
      return { success: true, res: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
};

export const userLoginRepo = async (userData) => {
  const { email, password } = userData;
  try {
    
    const user = await userModel.findOne({ email });
    if (!user) {
      return {
        success: false,
        error: { statusCode: 404, msg: "user not found" },
      };
    } else {
      let passwordValidation = await bcrypt.compare(password,user.password);
      // console.log(passwordValidation);
      
      if (passwordValidation) {
        return { success: true, res: user };
      } else {
        return {
          success: false,
          error: { statusCode: 400, msg: "invalid credentials" },
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

export const resetPassword = async(id,newpassword) => {
  const user = await userModel.findById(id);
  
  // console.log(typeof(newpassword));
  if(!user){
    return {success:false,error:{statusCode:404,msg:"user not found"}}
  }else{
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    
    user.password = hashedPassword;
    let updatedUser = await user.save();

    return { success: true, res: updatedUser };
    
    
  }
}

export const findByMail = async(email) =>{
  const user = await userModel.findOne({email});
  return user?true:false;
}

export const findUser = async(id) =>{
  try{
    
    const user = await userModel.findById(id).select('-password -sentRequests -receivedRequests -interactions -__v');
    if(user){
      return { success: true, res: user };
    }else{
      return {success:false,error:{statusCode:404,msg:"user not found"}}
    }
  }catch(err){
    console.log(err);
    return {success:false,error:{statusCode:404,msg:"user not found"}}
  }
 
}
export const getAllUsers = async() =>{
  try{
    const users = await userModel.find().select('-password -sentRequests -receivedRequests -_id -interactions -__v');
    if(users){
      return { success: true, res: users };
    }else{
      return {success:false,error:{statusCode:404,msg:"user not found"}}
    }
  }catch(err){
    console.log(err);
    return {success:false,error:{statusCode:404,msg:"user not found"}}
  }
 
}

export const updateDetails = async(data,id) =>{
  
  const user = await userModel.findById(id);
  if(user){
    if(data.name){
      user.name = data.name;
    }
    if(data.email){
      user.email = data.email;
    }
    if(data.age){
      user.age = data.age;
    }
    if(data.mobile){
      user.mobile = data.mobile;
    }
    const savedChanges = await user.save();
    const userObject = savedChanges.toObject();
    delete userObject.password;
    delete userObject.sentRequests;
    delete userObject.receivedRequests;
    delete userObject._id;
    delete userObject.interactions;
    delete userObject.__v;
    return {success:true,res:userObject};
  }else{
    return {success:false,error:{statusCode:404,msg:"user not found"}}
  }
  
    
  
  
}