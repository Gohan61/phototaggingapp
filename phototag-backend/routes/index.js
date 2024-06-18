const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

router.post("/", gameController.getCoordinates);

router.get("/", gameController.startTime);

module.exports = router;
