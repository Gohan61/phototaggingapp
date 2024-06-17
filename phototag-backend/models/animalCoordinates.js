const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoordinatesSchema = new Schema({
  coords: [
    {
      x: [Number, Number],
      y: [Number, Number],
    },
    { x: [Number, Number], y: [Number, Number] },
    { x: [Number, Number], y: [Number, Number] },
  ],
});

const CoordinatesModel = mongoose.model("Coordinates", CoordinatesSchema);

const coordinates = new CoordinatesModel({
  coords: [
    { x: [104, 131], y: [153, 168] },
    { x: [235, 311], y: [127, 152] },
    { x: [424, 496], y: [225, 259] },
  ],
});

// coordinates.save();

module.exports = CoordinatesModel;
