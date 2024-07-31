const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().lean();
    res.status(200).json({
      success: true,
      message: "All users fetched",
      data: users,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//create new user
const createNewUser = async (req, res, next) => {
  const { userName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({
      $or: [{ userName: userName }, { email: email }],
    });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username or email already exists. Try with different one",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName: userName,
      email: email,
      password: hashedPassword,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Registration failed. Please try again later",
      });
    }

    res.status(201).json({
      success: true,
      message: "Signup successful",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//user login
const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email }).lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please Sign Up",
      });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password. Please enter correct password",
      });
    }

    const token = jwt.sign({ userId: user._id }, secret);

    res.status(202).json({
      success: true,
      message: "Login Successful",
      token: token,
      userData: {
        userName: user.userName,
        id: user._id,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//user data update
const userUpdate = async (req, res, next) => {
  const userId = req.user;
  const { userName, email, oldPassword, password } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //checking if username and email already registered
    const existingUser = await User.findOne({
      $or: [{ userName: userName }, { email: email }],
    });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username or email already exists. Try with different one",
      });
    }

    //comparing old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.userName = userName;
    user.email = email;
    user.password = hashedPassword;
    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "User data updated Successfully. Please login again to continue",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getUsers,
  createNewUser,
  userLogin,
  userUpdate,
};
