import dotenv from "dotenv";
dotenv.config();
import swagger from 'swagger-ui-express';
import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./features/users/userRoutes.js";
import otpRoutes from "./features/resetPassword/resetRoutes.js";
import postRoutes from "./features/posts/postRoutes.js";
import commentRoutes from "./features/comments/commentRoutes.js";
import likeRoutes from "./features/likes/likeRoutes.js";
import friendRoute from "./features/friendRequests/friendRoutes.js";
import { loggermiddleware } from "./middlewares/loggerMiddleware.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";

import apiDocs from "./documentation.json" assert{type:'json'};
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(loggermiddleware);
app.use("/api-docs",swagger.serve,swagger.setup(apiDocs));
app.use('/socialmedia/api/user',userRouter);
app.use('/socialmedia/api/otp',otpRoutes);
app.use('/socialmedia/api/post',postRoutes);
app.use('/socialmedia/api/comment',commentRoutes);
app.use('/socialmedia/api/like',likeRoutes);
app.use('/socialmedia/api/friend',friendRoute);
app.use(errorHandlerMiddleware);
app.use((req,res)=>{
    res.status(404).send("please check localhost:3000/api-docs for how to use api")
})
export default app;
