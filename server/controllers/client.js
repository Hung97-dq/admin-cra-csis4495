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

export const getTransactions = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await PostMessage.find({
      $or: [
        { loanAmount: { $regex: new RegExp(search, "i") } },
        { memberID: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await PostMessage.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

