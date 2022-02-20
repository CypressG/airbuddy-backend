const userActionsSchema = new mongoose.Schema({
  page: String,
  query: String,
});

exports.userActionsSchema = userActionsSchema;
