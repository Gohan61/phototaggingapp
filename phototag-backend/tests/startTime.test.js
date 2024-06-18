const request = require("supertest");
const express = require("express");
const app = express();
const index = require("../routes/index");

app.use("/", index);

test("Returns that game has started", async () => {
  const res = await request(app)
    .get("/")
    .set("Content-Type", "application/json")
    .then((res) => {
      expect(res.body).toEqual({ message: "Game has started" });
    });
});
