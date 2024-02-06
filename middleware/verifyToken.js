import jwt from "jsonwebtoken";

//Token Verification middleware
export const verifytoken = async (req, res, next) => {
  try {
    const { token } = req.headers.authorization;
    console.log(token);
    next();
  } catch (error) {
    return error;
  }
};
