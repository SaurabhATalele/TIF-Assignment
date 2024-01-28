// import roleModel from "../models/roleModel.js";
// import connectDB from "../DB/connectDB.js";
// import { Snowflake } from "@theinternetfolks/snowflake";

// const createRole = async (req, res) => {
//   try {
//     const { name } = req.body;
//     connectDB();

//     const id = Snowflake.generate();

//     const role = await new roleModel({ _id: id, name });
//     await role.save();

//     res.status(200).json({ Message: "Role created successfully..." });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// const getAll = async (req, res) => {
//   try {
//     connectDB();
//     const data = await roleModel.find();

//     res.status(200).json({ data });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// export { createRole, getAll };


import { PrismaClient } from '@prisma/client';
import { Snowflake } from "@theinternetfolks/snowflake";

const prisma = new PrismaClient();

const createRole = async (req, res) => {
  try {
    const { name } = req.body;

    const id = await Snowflake.generate();

    await prisma.role.create({
      data: {
        id: id,
        name: name
      }
    });

    res.status(200).json({ Message: "Role created successfully..." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const data = await prisma.role.findMany();

    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { createRole, getAll };
