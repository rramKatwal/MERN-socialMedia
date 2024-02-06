import postModel from "../models/postsModel.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.find();
    res.status(200).send({
      posts,
    });
  } catch (error) {
    error;
  }
};
export const imagePosts = async (req, res) => {
  try {
    const { imageName } = req.body;
    const { images } = req.file ? req.file.filename : undefined;
    const posts = await postModel({
      imageName,
      images,
    }).save();
    res.status(200).send({
      posts,
    });
  } catch (error) {
    error;
  }
};
export const videoPosts = async (req, res) => {
  try {
    const { videoName, VideoURL } = req.file ? req.file.filename : undefined;
    const posts = await postModel({
      videoName,
      VideoURL,
    }).save();
    res.status(200).send({
      posts,
    });
  } catch (error) {
    error;
  }
};
