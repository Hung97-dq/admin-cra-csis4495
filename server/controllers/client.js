import Predict from "../models/prediction.js";
import PostMessage from "../models/postMessage.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const getPredicts = async (req, res) => {
  try {
    const predicts = await Predict.find().sort({ createdAt: -1 });
    
    res.status(200).json(predicts);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
export const deleteCustomer = async (req,res)  => {
  const {id} =req.params;
  console.log(req.params);
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that id');

    await User.findByIdAndRemove(id);
    res.set('Access-Control-Allow-Credentials', 'true')
    res.set('Access-Control-Allow-Origin', req.headers.origin)
    res.status(200).json({message: 'User deleted'});
};


