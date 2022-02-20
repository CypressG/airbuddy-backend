const mongoose = require("mongoose");
const schema = require("./schemas/locationActionsSchema");

const locationActions = mongoose.model("UserActions", schema);

module.exports = locationActions;
