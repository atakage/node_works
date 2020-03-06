var express = require('express');
var router = express.Router();

/* GET home page. */

// json type의 클래스 데이터
router.get('/', function(req, res, next) {
  var book = {
    name: '자바스크립트만세',
    writer : '이몽룡',
    comp : '한빛출판사',
    year: 2020

  }

  var books = [

    {name:'K1'},
    {name:'K2'},
    {name:'K3'},
    {name:'K4'},
    {name:'K5'},

  ]

  res.render('index', { title: '인클루드 연습', book : book, books:books });
});

module.exports = router;
