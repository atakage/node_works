var express = require("express");
var router = express.Router();
var moment = require("moment");
var listVO = require("../models/listVO");

router.get("/insert", function(req, res) {
  var list = new listVO(req.body);

  res.render("insert", { list: list, delBtn: "x", insertBtn: "OK" });
});

router.post("/insert", function(req, res) {
  req.body.cDate = "";
  req.body.complete = "";

  req.body.insertDate =
    moment().format("YYYY-MM-DD") + "(" + moment().format("HH:mm:ss") + ")";

  var list = new listVO(req.body);

  var _id = req.body._id;

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

  // 기존 것 업데이트
});

router.get("/update/:_id/:complete", function(req, res) {
  var _id = req.params._id;
  //var completeVal = req.params.complete; // on
  var insertBtn = "OK";

  if (req.params.complete == "on") {
    insertBtn = "X";
  }

  listVO.findOne({ _id: _id }, function(err, result) {
    res.render("insert", { list: result, delBtn: "OK", insertBtn: insertBtn });
  });
});

router.post("/delete", function(req, res) {
  console.log("삭제할 때 아이디값", req.body._id);
  listVO.deleteOne({ _id: req.body._id }, function(err, result) {
    res.end("삭제 완료");
  });
});

router.post("/checkupdate", function(req, res) {
  // req.body.arr : id들이 들어있는 배열
  console.log("체크어레이2", req.body.arr);

  // var list = new listVO(req.body);
  var arr = req.body.arr;

  var date =
    moment().format("YYYY-MM-DD") + "(" + moment().format("HH:mm:ss") + ")";

  // req.body.complete = "ok";

  // 배열 내부에 요소가 1개 있을 때는 forEach 에러
  if (arr.length == 24) {
    listVO.update(
      { _id: arr },
      { $set: { cDate: date, complete: "ok" } },
      function(err, data) {}
    );

    res.send("체크 완료");
  }

  arr.forEach(function(item) {
    console.log("리스트 넘어", item);

    listVO.update(
      { _id: item },
      { $set: { cDate: date, complete: "ok" } },
      function(err, data) {}
    );
  });

  res.send("체크 완료");
  /*
  listVO.collection.updateMany({ _id: req.body.arr }, {$set : { complete :"ok"} ,req.body, function(
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
  */
});

module.exports = router;
