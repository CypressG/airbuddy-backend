const mongoose = require("mongoose");
const schema = require("./schemas/locationActionsSchema");

const locationActions = mongoose.model("LocationAction", schema);

module.exports = locationActions;
