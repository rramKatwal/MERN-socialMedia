import { comparedPassword, hashPassword } from "../functions/hashing.js";
import userModel from "../models/userModel.js";

//Get all users
export const getUsers = async (req, res) => {
  try {
    const user = await userModel.find();
    res.status(200).send({
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

//Get user by id
export const getUserbyID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).send({ user });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
};

//Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      gender,
      oldPassword,
      newPassword,
      cPassword,
      profilePicture,
    } = req.body;

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const checkOldPassword = await comparedPassword(oldPassword, user.password);
    if (!checkOldPassword) {
      return res.status(200).send({
        success: false,
        message: "Your Old Password is incorrect",
      });
    }
    if (newPassword !== cPassword) {
      return res.status(200).send({
        success: false,
        message: "Please Confirm your Password",
      });
    }
    const hashedPassword = await hashPassword(newPassword);
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { name, gender, profilePicture, password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
};

//delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: false,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
};
