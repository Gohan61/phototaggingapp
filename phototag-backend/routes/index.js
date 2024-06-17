const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

router.post("/", gameController.getCoordinates);

module.exports = router;
