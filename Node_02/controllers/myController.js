var express = require('express')
var router = express.Router()


// /hello/  함께 path mapping이 됨
router.get("/", function(req,res){

    // write() 함수를 사용해서 web 브라우저에 문자열 형태로 데이터를 표시하도록 하기
    // write() 문자열들을 전송하고 끝에 반드시 end()를 전송해 주어야 함
    // 한줄의 문자열만 전송할 때는 end()만 전송해도 됨
    res.write("Hello")

    res.end("end")

})



const retData = {

    nation : "Korea",
    name : "Hong Kil Dong",
    age : 30

}



router.get("/json", function(req,res){



    res.json(retData)

})



// router의 call 함수의 파라미터
// 첫 번째 파라미터(req)는 web에서 전송되는 request 정보가 담긴 변수
// 두 번째 파라미터(res)는 서버에서 web에게 응답할 때 데이터를 담거나 여러 정보를 담아서 보낼 객체 
router.get("/view", function(req, res){

    res.render("myview", 
    {
        nation : '대한민국',
        name : 'Hong',
        age : 22
    
    })


})


router.get("/model", function(req,res){

    res.render("mymodel", {mydata:retData})

})



// 서버에 request 요청할 때 query String으로 데이터를 보내면 
// req.query 객체를 참조하여 값을 입력받을 수 있음
router.get("/insert", function(req,res){


    let name = req.query.name
    let nation = req.query.nation

    let retData =  {name:name, nation:nation}


    res.json(retData)

})


// pathvariable 방식으로 데이터를 받기
router.get("/update/:id/:age", function(req,res){

    let id = req.params.id
    let age = req.params.age


    let retData = {id:id, age:age}

    res.json(retData)

})


router.get("/add", function(req,res){


    res.writeHead(200, {"Content-Type":"text/html;charset=UTF8"})

    res.end("숫자가 없어서 덧셈 불가, 덧셈을 수행하려면 2개의 숫자를 붙여 보내주세요")
})


router.get("/add/:num1/:num2", function(req,res){

    let num1 = parseInt(req.params.num1)
    let num2 = parseInt(req.params.num2)

    // res.writeHead(200, {"Content-Type":"text/html;charset=UTF8"})


    let ret = {

        숫자1: num1,
        숫자2: num2,
        합계: num1 + num2


    }

    res.json(ret)

   // res.end("num1:" + num1 + "num2" + num2 + "=" + num1+num2)
})

module.exports = router