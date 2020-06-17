var mongoose = require("mongoose");
var memberModel = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  grade: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("tbl_member", memberModel);
