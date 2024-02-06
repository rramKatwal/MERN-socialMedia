import mongoose, { model, Schema } from "mongoose";

const chatModel = model(
  "Chat",
  new Schema(
    {
      user: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      chatName: {
        type: String,
        trimm: true,
      },
      isGroupchat: {
        type: Boolean,
        default: false,
      },
      isLatestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
      groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    { timestamps: true }
  )
);

export default chatModel;
