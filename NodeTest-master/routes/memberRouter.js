var express = require("express");
var router = express.Router();
var memberVO = require("../models/member");

router.get("/login", function (req, res) {
  // let session = req.session;
  res.render("login");
});

router.post("/login", async function (req, res, next) {
  console.log(JSON.stringify(req.body));

  let id = req.body.id;
  let password = req.body.password;

  memberVO.findOne(
    {
      id: id,
      password: password,
    },
    // db select 후 result(data)값 size(length) 추출법
    function (err, data) {
      if (data == null) {
        res.end("FAIL");
        res.redirect("/");
      } else {
        req.session.userid = data.id;

        res.end("LOGINOK");
        console.log(data.id);

        //res.render();
      }
    }
  );
});

router.post("/checkid", function (req, res) {
  console.log(req.body.id);

  memberVO.findOne({ id: req.body.id }, function (err, data) {
    if (data == null) {
      res.end("CHECKOK");
    }
    res.end("NO");
  });
});

router.post("/join", function (req, res) {
  let id = req.body.id.replace(/ /g, "");
  let password = req.body.password.replace(/ /g, "");
  let grade = req.body.grade.replace(/ /g, "");

  console.log(JSON.stringify(req.body));

  // server에서 2차 검사
  if (
    id.length > 8 ||
    id.length < 4 ||
    password.length < 10 ||
    password.length > 20 ||
    !grade == "N" ||
    !grade == "P"
  ) {
    res.redirect("/member/login");
  }

  console.log("검증통과");
  var joinMemberVO = new memberVO(req.body);

  console.log("생성완료");

  joinMemberVO.save(req.body, function (err, data) {
    res.redirect("/");
  });
});

module.exports = router;
