var express = require('express')
var router = express.Router();

var bookVO = require('../models/book')

router.get('/list', function(req, res){
    


    bookVO.find({}, function(err, data){

        res.render('index', {title: '도서 리스트', book:data});

    })

});



router.get('/insert', function(req,res){


    res.render('insert');

})


router.post('/insert', function(req,res){


    var saveBookVO = new bookVO(req.body)


    saveBookVO.save(req.body, function(err, data){

        res.redirect('/book/list')
    })


})


router.get('/update', function(req,res){


    var sendBookVO = new bookVO(req.query)


    res.render('insert', {book:sendBookVO});


  res.render('',)


})



router.post('/update', function(req,res){


    var updateBookVO = new bookVO(req.body)

    updateBookVO

    updateBookVO.update

})


module.exports = router;