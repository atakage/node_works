var express = require('express')
var router = express.Router()


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

        b_date : '2020-03-10',
        b_time : '11:04:00'


    }
    res.render('bbs/write', {bbsVO:bbsVO})
})


router.post('/insert', function(req,res){

    bbsVO.create({

        b_writer : req.body.b_writer,
        b_date : req.body.b_date,
        b_time : req.body.b_time,
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
        b_date : req.body.b_date,
        b_time : req.body.b_time,
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