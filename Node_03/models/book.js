/*
    js의 변수 선언자
    var : 전역변수, 현재 모듈(*.js) 어디에서나 값을 읽고 쓸 수 있는 선언
    const : 상수, 현재 모듈 어디에서나 값을 읽을 수 있고 최초 한 번만 값을 할당
    let : 지역변수, 현재 함수 내에서만 값을 읽고 쓸 수 있고 함수를 벗어나면 변수가 해제됨
*/
var mong = require("mongoose")
var bookModel = mong.Schema({

    BName : {

        type : String,
        required : true, //not Null
        unique : true,
        trim : true // 빈칸 생략

    },
    BComp : String,
    BWriter : String,
    BPrice : Number,
    BYear : {
        type: String,
        lowercase : true
    }
})

/*
    model()에 설정하는 document(book) 이름은 단수로 지정하는 것이 좋음

    실제 db에 저장될 때는 document 이름이 복수로 변경되어 저장
    mongo console에서 조회를 할 때는 다음과 같이 db.books.find({})
*/
module.exports = mong.model("book", bookModel)