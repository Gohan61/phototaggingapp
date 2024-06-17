const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoordinatesSchema = new Schema({
  brownChicken: {
    x: [Number, Number],
    y: [Number, Number],
  },
  rabbit: { x: [Number, Number], y: [Number, Number] },
  whiteChicken: { x: [Number, Number], y: [Number, Number] },
});

const CoordinatesModel = mongoose.model("Coordinates", CoordinatesSchema);

const coordinates = new CoordinatesModel({
  brownChicken: { x: [104, 131], y: [153, 168] },
  rabbit: { x: [235, 311], y: [127, 152] },
  whiteChicken: { x: [424, 496], y: [225, 259] },
});

// coordinates.save();

module.exports = CoordinatesModel;
