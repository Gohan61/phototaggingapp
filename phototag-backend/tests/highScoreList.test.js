const request = require("supertest");
const express = require("express");
const app = express();
const index = require("../routes/index");
const initializeMongoServer = require("../config/databaseTest");
const Highscoremodel = require("../models/highscores");

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

  highscores.save();
});

app.use("/", index);

test("returns a highscorelist", async () => {
  const res = await request(app)
    .get("/highscores")
    .set("Content-Type", "application/json")
    .then((res) => {
      expect(res.body.highscores).not.toBeNull();
    });
});
