var express = require("express");
var router = express.Router();
var moment = require("moment");
var listVO = require("../models/listVO");

router.get("/insert", function(req, res) {
  var list = new listVO(req.body);

  res.render("insert", { list: list, delBtn: "none" });
});

router.post("/insert", function(req, res) {
  req.body.insertDate =
    moment().format("YYYY-MM-DD") + "(" + moment().format("HH:mm:ss") + ")";

  var list = new listVO(req.body);

  var _id = req.body._id;

  console.log("인서트 포스트 리퀘바디", req.body);

  // 왜 listVO가 들어가는지?
  listVO.findOne({ _id: _id }, function(err, result) {
    if (result == null) {
      // 왜 list가 들어가는지 ?? 차이를 모르겠음
      list.save(req.body, function(err, result) {
        res.redirect("/");
      });
    } else {
      listVO.updateOne({ _id: _id }, { $set: req.body }, function(err, result) {
        res.redirect("/");
      });
    }
  });

  // 새로 작성

  //   if (req.body.title.trim().length < 1) {
  //     //   var list = new listVO(req.body);
  //     res.render("insert", {
  //       insertAlert: "제목을 다시 입력하세요",
  //       list: list,
  //       delBtn: "none"
  //     });
  //   }

  // 기존 것 업데이트
});

router.get("/update/:_id", function(req, res) {
  var _id = req.params._id;

  listVO.findOne({ _id: _id }, function(err, result) {
    res.render("insert", { list: result, delBtn: "OK" });
  });
});

router.post("/delete", function(req, res) {
  console.log("삭제할 때 아이디값", req.body._id);
  listVO.deleteOne({ _id: req.body._id }, function(err, result) {
    res.end("삭제 완료");
  });
});

router.post("/checkupdate", function(req, res) {
  console.log("체크어레이2", req.body.arr);

  req.body.cDate =
    moment().format("YYYY-MM-DD") + "(" + moment().format("HH:mm:ss") + ")";

  req.body.complete = "ok";

  var list = new listVO(req.body);

  listVO.collection.updateMany({ _id: req.body.arr }, req.body, function(
    err,
    result
  ) {
    if (err) {
      res.send("Data Bulk Update Error");
    }
    {
      res.redirect("/");
    }
  });
});

module.exports = router;
