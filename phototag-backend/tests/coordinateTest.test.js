const request = require("supertest");
const express = require("express");
const app = express();
const index = require("../routes/index");
const initializeMongoServer = require("../config/databaseTest");
const CoordinatesModel = require("../models/animalCoordinates");

beforeAll(async () => {
  initializeMongoServer();

  const coordinates = new CoordinatesModel({
    brownChicken: { x: [104, 131], y: [153, 168] },
    rabbit: { x: [235, 311], y: [127, 152] },
    whiteChicken: { x: [424, 496], y: [225, 259] },
    _id: "66704aee26485e9e9147fcea",
  });

  coordinates.save();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", index);

test("Coordinates not in range", async () => {
  const payload = { x: 120, y: 500, animal: "rabbit" };

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
  const payload = { x: 105, y: 155, animal: "brownChicken" };

  const res = await request(app)
    .post("/")
    .send(payload)
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .then((res) => {
      expect(res.body).toEqual({ message: "Coordinates in range" });
    });
});
