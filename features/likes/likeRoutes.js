import express from 'express';
import { auth } from '../../middlewares/jwtAuth.js';
import { togglelike,getLikes } from './likeController.js';

const likeRoutes = express.Router();

likeRoutes.route('/:id').get(auth,getLikes);
likeRoutes.route('/toggle/:id').get(auth,togglelike);

export default likeRoutes;
