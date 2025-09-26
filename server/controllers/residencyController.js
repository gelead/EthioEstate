import asyncHandler from "express-async-handler";
import prisma from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  console.log("Creating a residency...");

  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email: userEmail } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });

    res.status(201).json({
      message: "Residency created successfully",
      residency,
    });
  } catch (err) {
    if (err.code === "P2002") {
      return res
        .status(409)
        .json({ message: "A residency with that address already exists" });
    }

    res.status(500).json({ message: err.message });
  }
});
export const getAllResidencies = asyncHandler(async (req, res) => {
  try {
    const residencies = await prisma.residency.findMany({});

    res.send(residencies);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

export const getResidency = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const residency = await prisma.residency.findUnique({
      where: { id: id },
    });
    res.send(residency);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});
