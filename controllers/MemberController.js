import { PrismaClient } from "@prisma/client";
import { Snowflake } from "@theinternetfolks/snowflake";

const prisma = new PrismaClient();

const addMember = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const id = await Snowflake.generate();
    const { community, user, role } = req.body;
    console.log(ownerId);

    // const comm = await prisma.community.findFirst({
    //   where: {
    //     ownerId,
    //   },
    // });
    // if (!comm) {
    //   res.status(403);
    // } else {
    const data = {
      id,
      userId: user,
      communityId: community,
      roleId: role,
    };

    console.log(data);
    const mem = await prisma.member.create({
      data,
    });
    res.status(200).json({ mem });
    // }
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user.id;

    const comm = await prisma.community.findFirst({
      where: {
        ownerId: user,
      },
    });

    if (comm) {
      const data = await prisma.member.delete({
        where: {
          id,
        },
      });
    } else {
      res.status(402);
    }

    res.status(200).json({ message: "Member Deleted" });
  } catch (error) {
    res.status(400).json(error);
  }
};

export { addMember, deleteMember };
