const asyncHandler = require("express-async-handler");
const Coordinates = require("../models/animalCoordinates");

exports.getCoordinates = asyncHandler(async (req, res, next) => {
  const coordinates = await Coordinates.findById(
    "6670343dc291fd6c5d232b3e"
  ).exec();

  for (const coordinate of coordinates.coords) {
    console.log(coordinate);
    if (
      coordinate.x[0] <= req.body.x &&
      req.body.x <= coordinate.x[1] &&
      coordinate.y[0] <= req.body.y &&
      req.body.y <= coordinate.y[1]
    ) {
      return res.status(200).json({ message: "Coordinates in range" });
    }
  }
  return res.status(200).json({ message: "Coordinates not in range" });
});
