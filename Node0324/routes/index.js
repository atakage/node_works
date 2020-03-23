var express = require("express");
var router = express.Router();

var listVO = require("../models/listVO");

/* GET home page. */
router.get("/", function(req, res, next) {
  listVO.find({}, function(err, result) {
    console.log("북" + result);

    res.render("index", { list: result, title: "나의 버킷 리스트" });
  });
});

module.exports = router;
