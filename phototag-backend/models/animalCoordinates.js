const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Coordinates = new Schema({
  brownChickenX: { type: Number, min: 104, max: 131 },
  brownChickenY: { type: Number, min: 153, max: 168 },
  rabbitX: { type: Number, min: 235, max: 311 },
  rabbitY: { type: Number, min: 127, max: 152 },
  whiteChickenX: { type: Number, min: 424, max: 496 },
  whiteChickenY: { type: Number, min: 225, max: 259 },
});
