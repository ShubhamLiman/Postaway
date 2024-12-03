import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "on_model",
    },
    on_model: {
        type: String,
        enum: ["Post", "Comment"],
    }
})

export const likeModel = mongoose.model('Like',likeSchema);