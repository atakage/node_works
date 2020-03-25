var mongoose = require("mongoose");

var tbl_list = mongoose.Schema({
  //  제목
  title: {
    type: String,
    unique: true
  },

  //  내용
  content: String,

  //  등록날짜
  insertDate: String,

  //  완료날짜
  cDate: String,

  //  완료여부
  complete: String
});

module.exports = mongoose.model("tbl_list", tbl_list);
