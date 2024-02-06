import userModel from "../models/userModel.js";
import OTPmodel from "../models/otpModel.js";
import { hashPassword } from "../functions/hashing.js";
import { mailer } from "../functions/mail.js";

export const sendMail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.send({
        success: false,
        message: "Please Enter your Valid Email",
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      const optCode = Math.floor(100000 + Math.random() * 900000);
      const otpData = await new OTPmodel({
        email,
        otp: optCode,
        expiresIn: new Date().getTime() + 180 * 1000,
      }).save();

      mailer(email, optCode);

      return res.status(201).send({
        success: true,
        message: "OTP send Successfully. Please check your Email Id",
        otpData,
      });
    } else {
      return res.status(200).send({
        success: false,
        message: "Email not found. Please Register to continue.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(200).send({
      success: false,
      message: "Problem while sending Mail",
      error: error.message,
    });
  }
};

//Reset Password
export const ResetPassword = async (req, res) => {
  try {
    const { otp, password, cPassword } = req.body;

    if (!otp || !password || !cPassword) {
      return res.status(200).json({
        success: false,
        message: "All fields are required",
      });
    }

    const otpData = await OTPmodel.findOne({ otp });

    if (!otpData) {
      return res.status(200).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const currentTime = new Date().getTime();
    const diff = otpData.expiresIn - currentTime;

    if (diff < 0) {
      return res.status(200).json({
        success: false,
        message: "OTP Expired",
      });
    }

    if (password !== cPassword) {
      return res.status(200).json({
        success: false,
        message: "Passwords do not match. Please enter them correctly",
      });
    }

    const hashedPassword = await hashPassword(password);
    const updatedUser = await userModel.findOneAndUpdate(
      { email: otpData.email },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(200).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
