const request = require("supertest");
const express = require("express");
const app = express();
const index = require("../routes/index");
const initializeMongoServer = require("../config/databaseTest");
const CoordinatesModel = require("../models/animalCoordinates");

beforeAll(async () => {
  initializeMongoServer();

  const coordinates = new CoordinatesModel({
    coords: [
      { x: [104, 131], y: [153, 168] },
      { x: [235, 311], y: [127, 152] },
      { x: [424, 496], y: [225, 259] },
    ],
    _id: "6670343dc291fd6c5d232b3e",
  });

  await coordinates.save();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", index);

test("Coordinates not in range", async () => {
  const payload = { x: 120, y: 500 };

  const res = await request(app)
    .post("/")
    .send(payload)
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .then((res) => {
      expect(res.body).toEqual({ message: "Coordinates not in range" });
    });
});

test("Coordinates in range", async () => {
  const payload = { x: 105, y: 155 };

  const res = await request(app)
    .post("/")
    .send(payload)
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .then((res) => {
      expect(res.body).toEqual({ message: "Coordinates in range" });
    });
});
