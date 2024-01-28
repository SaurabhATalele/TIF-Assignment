import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Snowflake } from "@theinternetfolks/snowflake";

const main = async () => {
  prisma.$connect();
  const id = Snowflake.generate();
  //   const a = await prisma.user.create({
  //     data: {
  //       id,
  //       name: "Saurabh Talele",
  //       email: "saurabhtalele@gmail.com",
  //       password: "India@11",
  //     },
  //   });

  const a = await prisma.user.findFirst();
  console.log(a);
  prisma.$disconnect();
};

main();
