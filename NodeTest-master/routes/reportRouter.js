var express = require("express");
var router = express.Router();

router.get("/dumpReport", function (req, res) {
  res.render("dump_report");
});

module.exports = router;
