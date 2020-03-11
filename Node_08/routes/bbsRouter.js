var express = require('express')
var router = express.Router()



// moment와 moment-timezone은 가급적 순서를 지켜서 require
var moment = require('moment')

// require만 해주면 moment 내에서 자체적으로 호출하여 사용하는 미들웨어
var moment_timezone = require('moment-timezone')


// moment를 사용하기에 앞서 사용할 시간대를 설정
moment.tz.setDefault('Asia/Seoul')


// models 폴더에 여러개의 vo가 있으면 그들을 배열로 만들어서 가져옴
var {bbsVO} = require('../models')

router.get('/', function(req,res){

    // seq 4->5 find() 함수 삭제
    bbsVO.findAll().then(function(bbsList){
        res.render('index', {bbsList:bbsList})
    })
 //   res.end('list')
})

router.get('/insert', function(req,res){
    let bbsVO = {

        b_date : moment().format("YYYY[-]MM[-]DD"),
        b_time : moment().format("HH:mm:ss")


    }
    res.render('bbs/write', {bbsVO:bbsVO})
})


router.post('/insert', function(req,res){

    bbsVO.create({

        b_writer : req.body.b_writer,
        b_date : moment().format("YYYY[-]MM[-]DD"),
        b_time : moment().format("HH:mm:ss"),
        b_subject : req.body.b_subject,
        b_text : req.body.b_text

    }).then(function(result){
        res.redirect('/')
    })

})


router.get('/view/:id', function(req,res){

    let id = req.params.id

    // b_id = id인 데이터를 조회하여
    bbsVO.findOne({

        where : {b_id : id}
        
        // 있으면 bbs에 담고
    }).then(function(bbs){

        // 해당 레코드의 b_count값을 1증가 시키고 그 데이터를 view로 보냄
        bbsVO.update({b_count:bbs.b_count + 1}, {where : {b_id:bbs.b_id}}).then(function(result){
            res.render('bbs/view', {bbs:bbs})
        })

    })
})



router.get('/update/:id', function(req,res){

    let id = req.params.id

    bbsVO.findOne({

        where : {b_id : id}

    }).then(function(bbs){
        res.render('bbs/write',{bbsVO:bbs})
    }).catch(function(err){         // exception이 발생하면 웹페이지에 오류를 보임
        res.send(err)
    })

})



router.post('/update/:id', function(req,res){

    let id = req.params.id

    bbsVO.update({

        b_writer : req.body.b_writer,
        b_date : moment().format("YYYY[-]MM[-]DD"),
        b_time : moment().format("HH:mm:ss"),
        b_subject : req.body.b_subject,
        b_text : req.body.b_text

    }, {where: {b_id : id}}).then(function(result){
        res.redirect('/bbs/view/'+id)
    }).catch(function(err){
        res.send(err)
    })

})


router.get('/delete/:id', function(req,res){
    let id = req.params.id

    bbsVO.destroy({

        where : {b_id : id}

    }).then(function(result){
        res.redirect('/')
    })
})


module.exports = router