import express from "express";
import { auth } from "../../middlewares/jwtAuth.js";
import { upload } from "../../middlewares/fileUpload.js";
import { createPost,retriveById,postOfuser,allPosts,updatePost,deletePost } from "./postController.js";


const postRoutes = express.Router();

postRoutes.route('/').get(auth,postOfuser);
postRoutes.route("/all").get(auth,allPosts);
postRoutes.route('/:id').get(auth,retriveById);

postRoutes.route("/create").post(auth,upload.single("image"),createPost);
postRoutes.route("/update/:postId").put(auth,upload.single("image"),updatePost);
postRoutes.route("/delete/:postId").delete(auth,deletePost);
export default postRoutes;