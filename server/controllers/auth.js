import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email: email });
    if (user) return res.status(404).json({ msg: "User already exist. " });
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new User({
    name:`${firstName} ${lastName}`,
    email:email,
    password: passwordHash,
    role: "admin",
     });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("req.body", req.body);
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ msg: "User does not exist. " });
    if (!user.role == "admin") return res.status(504).json({msg: "User not the admin"});
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
    console.log('user',user);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};