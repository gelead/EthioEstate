import asyncHandler from "express-async-handler";
import prisma from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {
  console.log("creating a user");
  const { email } = req.body;
  const userExists = await prisma.user.findUnique({ where: { email: email } });
  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });
    res.send({ message: "User registered successfully", user: user });
  } else {
    res.status(400).json({ message: "User already registered" });
  }
});

export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res.status(400).json({ message: "residency is already booked by you" });
    } else {
      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
      res.send("your visit is booked successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});
export const getAllBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    const bookings = user.bookedVisits;
    if (bookings.length === 0) {
      res.send("You have no registered bookings");
    } else {
      res.send(bookings);
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    const index = user.bookedVisits.findIndex((visit) => visit.id === id);
    if (index === -1) {
      res.status(404).send({ message: "Booking not found" });
    } else {
      user.bookedVisits.splice(index, 1);
      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });
      res.send("Booking cancelled successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});export const toFavourite = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { favResidenciesID: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.favResidenciesID.includes(id)) {
      await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((favs) => favs !== id),
          },
        },
      });
      return res.status(200).send("Removed from favourites");
    }

    await prisma.user.update({
      where: { email },
      data: {
        favResidenciesID: { push: id },
      },
    });

    return res.status(200).send("Added to favourites");
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});export const getAllFavourite = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { favResidenciesID: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.favResidenciesID.length === 0) {
      return res.status(200).send("You have 0 favourites");
    }

    const allFavs = user.favResidenciesID;
    return res.status(200).send(allFavs);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});
