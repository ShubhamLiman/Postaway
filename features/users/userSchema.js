import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    minLength: [3, "The name should be at least 3 characters long"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
    match: [/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/],
  },
  mobile: {
    type: String,
    unique: true,
    required: [true, "mobile number is reuired"],
  },
  age: {
    type: Number,
    required: [true, "age is required"],
    validate: {
      validator: function (userAge) {
        return userAge > 0 && userAge <= 100;
      },
      message: "age must be b/w 0 and 100",
    },
  },
  password: { type: String, required: [true, "password is required"] },
  posts:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  friends:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }],
  sentRequests:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Request',
  }],
  receivedRequests:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Request',
  }],
  interactions:{
    liked:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Post'
    }],
    commented:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Comment'
    }]
  }
});

export const userModel = mongoose.model('User',userSchema);