const request = require("supertest");
const express = require("express");
const app = express();
const index = require("../routes/index");
const initializeMongoServer = require("../config/databaseTest");
const Highscoremodel = require("../models/highscores");
const Timemodel = require("../models/time");

beforeAll(async () => {
  await initializeMongoServer();

  const highscores = new Highscoremodel(
    {
      username: "Testing1",
      time: 120,
      _id: "66714712f4c6aaed5a835a0e",
    },
    {
      username: "Testing2",
      time: 5,
      _id: "6671492bf4c6aaed5a835a0f",
    }
  );

  const time = new Timemodel({
    _id: "66726f2a0dea00a31a1e6224",
    startTime: 120,
  });

  highscores.save();
  time.save();
});

app.use("/", index);

test("Check if newHighscore returned", async () => {
  const res = await request(app)
    .get("/66726f2a0dea00a31a1e6224")
    .set("Content-Type", "application/json")
    .then((res) => {
      expect(res.body.finalTime).not.toBeNull();
      expect(res.body.newHighScore).not.toBeNull();
    });
});
