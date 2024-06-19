const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeSchema = new Schema({
  startTime: { type: Number, required: true },
});

module.exports = mongoose.model("Time", timeSchema);
