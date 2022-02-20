const mongoose = require("mongoose");
const locationActionsSchema = new mongoose.Schema({
  location: String,
  date: Date,
  weather: String,
});

module.exports = locationActionsSchema;
