const mongoose = require("mongoose");
const schema = require("./schemas/userActionSchema");

const userAction = mongoose.model("UserActions", schema);

exports.userAction = userAction;
