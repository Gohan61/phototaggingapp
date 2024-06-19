const request = require("supertest");
const express = require("express");
const app = express();
const index = require("../routes/index");
const Timemodel = require("../models/time");
const initializeMongoServer = require("../config/databaseTest");

beforeAll(async () => {
  await initializeMongoServer();
});

app.use("/", index);

test("Returns that game has started", async () => {
  const res = await request(app)
    .get("/")
    .set("Content-Type", "application/json")
    .then((res) => {
      expect(res.body.message).toEqual("Game has started");
      expect(res.body.id).not.toBeNull();
    });
});
