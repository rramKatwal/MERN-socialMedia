import mongoose, { model, Schema } from "mongoose";

const postModel = model(
  "Post",
  new Schema(
    {
      imageName: {
        type: String,
      },
      images: {
        type: String,
      },
      videoName: {
        type: String,
      },
      videoURL: {
        type: String,
      },
    },
    { timestamps: true }
  )
);

export default postModel;
