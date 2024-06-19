const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

router.post("/", gameController.getCoordinates);

router.get("/", gameController.startTime);

router.get("/highscores", gameController.getHighscores);

router.get("/:id", gameController.checkTime);

router.put("/highscore", gameController.saveHighscore);

module.exports = router;
