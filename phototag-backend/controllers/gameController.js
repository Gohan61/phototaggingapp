const asyncHandler = require("express-async-handler");
const Coordinates = require("../models/animalCoordinates");
let start;

exports.getCoordinates = asyncHandler(async (req, res, next) => {
  const coordinates = await Coordinates.findById(
    "66704aee26485e9e9147fcea"
  ).exec();

  const animal = coordinates[req.body.animal];

  if (
    animal.x[0] <= req.body.x &&
    req.body.x <= animal.x[1] &&
    animal.y[0] <= req.body.y &&
    req.body.y <= animal.y[1]
  ) {
    return res.status(200).json({ message: "Coordinates in range" });
  }

  return res.status(200).json({ message: "Coordinates not in range" });
});

exports.startTime = asyncHandler(async (req, res, next) => {
  start = Date.now();

  return res.status(200).json({ message: "Game has started" });
});

exports.checkTime = asyncHandler(async (req, res, next) => {
  let finalTime = Math.floor((Date.now() - start) / 1000);

  return res.status(200).json({ finalTime: finalTime });
});
