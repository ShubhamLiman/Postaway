import express from 'express';
import { auth } from '../../middlewares/jwtAuth.js';
import { addComment,getCommentsonPost,updateCommentControl,delComment } from './commentController.js';

const commentRoutes = express.Router();

commentRoutes.route('/get-details/:postId').get(auth,getCommentsonPost);
commentRoutes.route('/:postId').post(auth,addComment);
commentRoutes.route('/update/:commentId').put(auth,updateCommentControl);
commentRoutes.route('/delete/:commentId').delete(auth,delComment);

export default commentRoutes;
