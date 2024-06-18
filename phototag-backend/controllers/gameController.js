const asyncHandler = require("express-async-handler");
const Coordinates = require("../models/animalCoordinates");
const Highscores = require("../models/highscores");
const { body, validationResult } = require("express-validator");
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
  let newHighScore;

  let highScore = await Highscores.find({}, "time");

  highScore = highScore.map((times) => times.time).sort((a, b) => b - a);

  if (finalTime < highScore[0]) {
    newHighScore = "yes";
  }

  return res
    .status(200)
    .json({ finalTime: finalTime, newHighScore: newHighScore });
});

exports.saveHighscore = [
  body("username", "Username must be at least three characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    let highScore = await Highscores.find({});

    highScore = highScore.sort((a, b) => b.time - a.time);

    const updateId = highScore[0]._id.toString();

    const newHighscore = new Highscores({
      username: req.body.username,
      time: req.body.time,
      _id: updateId,
    });

    if (!errors.isEmpty()) {
      return res.json({ errors: errors });
    } else {
      await Highscores.findByIdAndUpdate(updateId, newHighscore);
      return res.json({ message: "Highscore updated" });
    }
  }),
];
