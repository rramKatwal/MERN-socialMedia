import mongoose, { model, Schema } from "mongoose";

const messageModel = model(
  "Message",
  new Schema(
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      content: {
        type: String,
        trimm: true,
      },

      chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
      },
    },
    { timestamps: true }
  )
);

export default messageModel;
