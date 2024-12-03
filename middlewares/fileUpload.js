import multer from "multer";
import path from "path";
const fileConfig = multer.diskStorage({

    destination:(req,file,cb) => {
        const imagesFolder = path.join("public","images");
        cb(null,imagesFolder);
    },

    filename:(req,file,cb) =>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()) * 1e9;
        const name = uniqueSuffix +'-'+ file.originalname;
        cb(null, name);
    },

});

export const upload = multer({
    storage: fileConfig,
})