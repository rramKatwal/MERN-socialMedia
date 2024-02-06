import mongoose, { model, Schema } from "mongoose";

const userModel = model(
  "User",
  new Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      gender: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
        trim: true,
      },
      profilePicture: {
        type: String,
        default:
          "https://i.pinimg.com/474x/d5/5c/d3/d55cd3816479c81a369df921be5daa45.jpg",
      },
    },
    { timestamps: true }
  )
);

export default userModel;
