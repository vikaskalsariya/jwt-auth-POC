const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const { setUser } = require("../services/auth");
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Please enter email and password fields" });

    const checkUser = await userModel.findOne({
      email: email,
    });

    if (checkUser)
      return res.status(409).json({ message: "Email is already registered" });

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      email,
      password: hashPassword,
    });

    await user.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Please enter email and password fields" });

    const user = await userModel.findOne(
      {
        email: email,
      },
      { password: 1 }
    );
    if (!user) return res.status(401).json({ message: "user not registered" });
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = await setUser(user);

    res.cookie("uid", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    });

    res.status(200).json({ message: "Login successful", token: token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    //get all user's data ussing aggrigate
    const users = await userModel.aggregate([{ $match: {} }]);
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
