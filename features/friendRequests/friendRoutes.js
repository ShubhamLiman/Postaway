import express from "express";
import { auth } from "../../middlewares/jwtAuth.js";
import { sendReq,respondToFriendrequest,getFriendsofUser ,getPending,toggleFriendship} from "./friendController.js";


const friendRoute = express.Router();

friendRoute.route('/get-pending').get(auth,getPending);
friendRoute.route('/get-friends/:id').get(auth,getFriendsofUser);
friendRoute.route('/:id').post(auth,respondToFriendrequest);
friendRoute.route('/req/:id').post(auth,sendReq);
friendRoute.route('/toggle/:id').get(auth,toggleFriendship);
export default friendRoute;