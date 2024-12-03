
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userRegisterationRepo, userLoginRepo, findUser,getAllUsers,updateDetails } from "./userRepository.js";


export const userRegisteration = async (req, res) => {
    let { password } = req.body;
    password = await bcrypt.hash(password, 12);
    const resp = await userRegisterationRepo({ ...req.body, password });
    if (resp.success) {
    res.status(201).send({
        success: true,
        msg: "user registration successful",
        res: resp.res,
    });
    } else {
    res.status(400).send(resp.error)
    }
};

export const userLogin = async (req, res) => {
  const resp = await userLoginRepo(req.body);
  if (resp.success) {
    const token = jwt.sign({ _id: resp.res._id }, process.env.JWT_SECRET , {
      expiresIn: "1h",
    });
    res
      .cookie("jwtToken", token, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true })
      .send({ success: true, msg: "user login successful", token });
  } else {
      res.status(400).send(resp.error.msg);
  }
};

export const userDetails = async(req,res) =>{
  const id = req.params.userId;
  const details = await findUser(id);
  if(details.success){
    res.status(200).send({message:'user found',user:details.res})
  }else{
    res.status(404).send({message:'user not found',error:details.error})
  }
}

export const getallUsers = async(req,res) =>{
  const users = await getAllUsers();
  if(users.success){
    res.status(200).send({message:'users found',users:users.res})
  }else{
    res.status(404).send({message:'user not found',error:users.error})
  }
}

export const updateUserDetails = async(req,res) =>{
  const id = req._id;
  const{name,email,age,mobile} = req.body;
  const userUpdate = await updateDetails(req.body,id);
  if(userUpdate.success){
    res.status(200).send({message:'user updated',users:userUpdate.res})
  }else{
    res.status(404).send({message:'user not found',error:userUpdate.error})
  }
  
}

export const userLogout = (req, res, next) => {
  res.clearCookie("jwtToken").json({ success: true, msg: "logout successful" });
};