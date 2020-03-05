// nodejs router(controller)에서 web request 응답을 쉽게 처리할 수 있도록 도움을 미들웨어
var express = require("express")

// web request에 반응하는 이벤트 핸들러 
var router = express.Router()


// mongoose로 설정한 model을 사용하기 위해 bookVO로 객체 선언하기
var bookVO = require('../models/book')



// web에서 localhost:3000/~~/라고 path를 요청하면 반응하는 이벤트 핸들러
// router.get() 요청은 callback 함수에게 req,res,next라고하는 3개의 매개변수를 주입
// req : web으로부터 전달된 HTTP 정보들이 들어있음
// res : 서버로부터 web에게 응답할 때 필요한 HTTP 정보들이 기본적으로 포함되어 있음
// req에서 필요한 정보, 데이터들을 추출하고 res에 응답할 데이터들을 추가하여 web에게 응답 수행
router.get("/", function(req,res,next){


    bookVO.find({}, function(err, data){
        //res.json(data)

        res.render("books/list", {books:data})

    })

})




router.get("/insert", function(req, res){
    
    var book = new bookVO()
    res.render("books/write", {book:book,btnText:'추가'})
})

// form POST method로 값이 전송되어 왔을 때
router.post("/insert", function(req,res){

    /*
        form의 input box에 값을 입력하고 submit을 수행하면 input box에 담긴 데이터들이 req의 body에 실려서 건너옴
        HTTP 프로토콜에서는 body에 실려있는 데이터를 payload라고 부름
        req.body 라는 속성을 참조하면
        body에는 vo형식의 데이터들이 담겨옴
    */

    // 새로운 bookVO를 생성하면서 request body를 주입하면 req.body의 데이터가 담긴 vo가 생성되고
    // 생성된 vo를 save에 주입함
    var newVO = new bookVO(req.body)

    // save가 성공하면 db로부터 추가된 데이터를 findOne하여 data에 담아둠
    newVO.save(req.body, function(err,data){
        // res.json(data)
        res.redirect("/book")
    })
})




router.get("/name", function(req,res){


    let name = req.query.name
    bookVO.findOne({BName:name},function(err,data){
        res.json(data)
    })

})



// id값을 path variable로 수신하여 데이터를 조회한 후 write폼으로 전송
router.get("/update/:id", function(req,res){

    // path vairable에 선언되고 전달받은 데이터는 req.params에 담겨 옴
    let id = req.params.id

    bookVO.findOne({_id:id}, function(err, data){

        res.render("books/write", {book:data, btnText:'수정'})
    })


})


// RestFull 방식에서는 update를 수행할 때는 method=PUT 방식으로 하도록 권장, 내가 수행하고자 하는 일이 무엇인지 명확히 하고 싶다는 의미
// router.put("/update/:id", functio....)
router.post("/update/:id", function(req,res){


    var id = req.params.id
    

    bookVO.update({_id:id}, {$set:req.body}, function(err, data){

        res.redirect("/book")

    })

}) 

// router.delete("/delete/:id")
router.get("/delete/:id", function(req,res){

    //let id = req.params.id

    bookVO.deleteOne({_id:req.params.id}, function(err, data){
       // res.json(data)
       res.redirect("/book")
    })
})



// 위에서 세팅된(초기화, get() 메서드가 설정된 상태) router 객체를 외부에서 참조할 수 있도록 내보내기 설정
// router 객체를 외부로 exports함
module.exports = router