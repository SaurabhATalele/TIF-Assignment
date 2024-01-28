import connectDB from "../DB/connectDB.js";
import communityModel from "../models/communityModel.js";
import { Snowflake } from "@theinternetfolks/snowflake";
import mongoose from "mongoose";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = async (req, res) => {
  try {
    const data = req.body;
    const id = Snowflake.generate();
    const owner = req.user.id;

    console.log(data, owner);

    const error = await prisma.community.create({
      data: {
        name: data.name,
        slug: data.slug,
        id: id,
        owner: { connect: { id: owner } },
      },
    });

    console.log(error);
    res.status(200).json({ message: "Community Created Successfully" });
  } catch (error) {
    res.json({ error });
  }
};

const getAll = async (req, res) => {
  try {
    const data = await prisma.community.findMany();
    res.status(200).json({ data });
  } catch (error) {
    res.json(400).json({ error });
  }
};

const getAllMembers = async (req, res) => {
  try {
    const { id } = req.params;

    const community = await prisma.community.findUnique({
      where: {
        id: id,
      },
      include: {
        members: true,
      },
    });

    console.log(community);

    res.json(community);
  } catch (error) {
    res.json({ error });
  }
};

const getMyOwnedCommunity = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId)

    const data =await prisma.community.findMany({
      data: {
        where: {
          ownerId: userId
        },
      },
    });

    res.status(200).json({ data });
  } catch (error) {
    res.json({ error });
  }
};

const getMyJoinedCommunity = async (req, res) => {
  try {
  } catch (error) {}
};

export {
  create,
  getAll,
  getAllMembers,
  getMyOwnedCommunity,
  getMyJoinedCommunity,
};
