const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const highScoreSchema = new Schema({
  username: { type: String, required: true, minLength: 3, maxLength: 20 },
  time: { type: Number, required: true },
});

module.exports = mongoose.model("Highscore", highScoreSchema);
