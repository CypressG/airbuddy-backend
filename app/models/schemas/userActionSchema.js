const mongoose = require("mongoose");

const userActionsSchema = new mongoose.Schema({
  page: String,
  query: String,
});

module.exports = userActionsSchema;
