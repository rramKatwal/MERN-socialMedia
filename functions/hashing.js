import bcrypt from "bcrypt";

//hashing_password
export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log("Problem while hashing Password");
    throw error;
  }
};

//compare_password
export const comparedPassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.log("Problem while veryfing Password");
    throw error;
  }
};
