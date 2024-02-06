import { comparedPassword, hashPassword } from "../functions/hashing.js";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Register_controller
export const Register = async (req, res) => {
  try {
    const { name, gender, email, password, cPassword } = req.body;
    const profilePicture = req.file ? req.file.filename : undefined;

    if (!name || !email || !gender || !password || !cPassword) {
      return res.status(200).send({
        success: false,
        message: "All fields are required.",
      });
    }
    if (password !== cPassword) {
      return res.status(200).send({
        success: false,
        message: "Password did not matched.",
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Email already Registered. Please login to continue.",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      gender,
      email,
      password: hashedPassword,
      profilePicture,
    }).save();
    res.send({
      message: "User Register successfully.",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
};

//LOGIN-Controller
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(200).send({
        success: false,
        message: "All fields are required.",
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(200).send({
        success: false,
        message: "Requested user cannot be found. Please register to continue.",
      });
    }
    const comparePassword = await comparedPassword(
      password,
      existingUser.password
    );
    if (!comparePassword) {
      return res.status(200).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
    res.send({
      message: "User Login successfully.",
      existingUser: {
        id: existingUser._id,
        name: existingUser.name,
        gender: existingUser.gender,
        email: existingUser.email,
        token,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
};
