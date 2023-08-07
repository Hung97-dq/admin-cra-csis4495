import User from "../models/User.js";
import PostMessage from "../models/postMessage.js";
import Predict from "../models/prediction.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {

    /* Recent Transactions */
    const transactions = await PostMessage.find().sort({ createdAt: -1 });
    const predicts = await Predict.find().sort({ createdAt: -1 });
    const users = await User.find({'role':'user'});
    
    res.status(200).json({
      transactions,
      predicts,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};