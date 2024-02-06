import mongoose, { model, Schema } from "mongoose";

const OTPmodel = model(
  "OTP",
  new Schema({
    otp: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    expiresIn: {
      type: Number,
      required: true,
    },
  })
);

export default OTPmodel;
