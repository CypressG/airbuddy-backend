const mongoose = require("mongoose");
const schema = require("./schemas/userActionsSchema");


const userActions = mongoose.model("UserActions", schema);

module.exports = userActions;
