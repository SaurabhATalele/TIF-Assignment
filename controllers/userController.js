// import connectDB from "../DB/connectDB.js";
// import userModel from "../models/userModel.js";
// import { Snowflake } from "@theinternetfolks/snowflake";
// import jwt from "jsonwebtoken";

// const createUser = async (req, res) => {
//   try {
//     const data = req.body;
//     connectDB();
//     const id = Snowflake.generate();
//     data._id = id;
//     const user = new userModel(data);
//     await user.save();
//     res.status(200).json({ Message: "User Created Successfullly..." });
//   } catch (error) {
//     console.log("Error occured");
//     res.status(400).json({ message: error.message });
//   }
// };

// const Login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     connectDB();
//     const user = await userModel.findOne({ email: email });
//     if (!user) {
//       res.status(401).json({ message: "User not found" });
//     }
//     const valid = await user.isValidPassword(password);

//     if (valid) {
//       const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
//       res.status(200).json({ token });
//     } else {
//       res.status(401).json({ message: "Invalid Password" });
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// const getMe = async (req, res) => {
//   try {
//     const token = req.header("AuthToken");

//     const decoded = jwt.decode(token);
//     const date = new Date(decoded.createdAt);
//     const day = date.getDate();
//     const month = date.getMonth() + 1; // Months are 0-indexed, so add 1
//     const year = date.getFullYear();
//     const userData = {
//       name: decoded.name,
//       email: decoded.email,
//       dateJoined: `${day}/${month}/${year}`,
//     };

//     res.status(200).json(userData);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// export { createUser, Login, getMe };

import { PrismaClient } from "@prisma/client";
import { Snowflake } from "@theinternetfolks/snowflake";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  try {
    const data = req.body;
    const id = Snowflake.generate();
    data.password = await encryptPassword(data.password);

    const response = await prisma.user.findFirst({
      where: { email: data.email },
    });
    if (response) {
      res.status(401).json({ Message: "User Already Exists" });
    }

    const user = await prisma.user.create({
      data: {
        ...data,
        id: id,
      },
    });
    res.status(200).json({ status: true, user });
  } catch (error) {
    console.log("Error occurred", error);
    res.status(400).json({ message: error.message });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.status(401).json({ message: "User not found" });
    } else {
      const isValid = await verifyPassword(password, user);
      if (isValid) {
        const token = await jwt.sign(user, process.env.JWT_SECRET);
        res.status(200).json({ token });
      } else {
        res.status(402).json({ message: "Invalid Password" });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const token = req.header("AuthToken");
    const decoded = jwt.decode(token);
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      name: user.name,
      email: user.email,
      dateJoined: user.createdAt, // Assuming createdAt is a field in your user model
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (err) {
    return null;
  }
};

const verifyPassword = async (password, user) => {
  try {
    return await bcrypt.compare(password, user.password);
  } catch (error) {
    return false;
  }
};
export { createUser, Login, getMe };
