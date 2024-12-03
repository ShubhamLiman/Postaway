import express from 'express';
import { upload } from "../../middlewares/fileUpload.js";
import { userRegisteration,userLogin,userLogout,userDetails,getallUsers,updateUserDetails } from './userController.js';
import { auth } from '../../middlewares/jwtAuth.js';
const userRouter = express.Router();

userRouter.route("/logout").get(userLogout);
userRouter.route("/get-details/:userId").get(auth,userDetails);
userRouter.route("/get-all-details").get(auth,getallUsers);
userRouter.route("/register").post(userRegisteration);
userRouter.route("/login").post(userLogin);
userRouter.route("/update-details").put(auth,upload.single('image'),updateUserDetails);

export default userRouter;