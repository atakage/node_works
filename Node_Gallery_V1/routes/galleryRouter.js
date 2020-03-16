var express = require('express')
var router = express.Router()
var galleryVO = require('../models/galleryVO')
var path = require('path')


// 파일(이미지)을 업로드 하기 위해서 multer를 설정하기
var multer = require('multer')

// 파일을 어디에 어떻게 업로드할 것인가를 설정하는 객체 만들기
// destination : 어디에 저장할 것인가에 대한 실행코드
// filename : 업로드할 때 원본 파일이름 -> uploadFileName으로 변경하는 코드가 들어있고 그 코드에서 filename을 생성해줌(업로드할 때 변환된 파일 정보가 들어이쓴 셈)


var saveOptions = multer.diskStorage({

    destination : (req,file,callBackFunc) => {
        var uploadPath = path.join(__dirname, "/../",'public','uploads')

        //  Node_Gallery_V1/public/uploads 형식으로 문자열 생성
        console.log(uploadPath)

        callBackFunc(null, uploadPath)
    },
    filename :  (req,file,callBackFunc) => {
        
        // 업로드된 파일 이름을 변환하여 해킹에 대비
        var uploadFileName = Date.now() + "_" + file.originalname
        
        callBackFunc(null, uploadFileName)
    }

})


var saveFile = multer({

    // 실제로 파일을 업로드하는 함수
    storage:saveOptions

}).single('gOriginalPhotoName')

router.get('/',(req,res)=>{
    galleryVO.find({}).exec((err,galleries)=>{
        res.render('index', {galleryList : galleries})
    })
    

})




router.get('/view/:id', (req,res)=>{

    let id = req.params.id
    galleryVO.findOne({_id:id}).exec((err,data)=>{
        res.render('gallery/view', {gallery:data})
    })

})



router.get('/upload:id', (req,res)=>{

    let id = req.params.id
    galleryVO.findOne({_id:id}).exec((err,data)=>{
        res.render('gallery/upload',{gallery:data})
    })
  

})


// put method
// RESTfull 방식에서 사용할 수 있는 4가지 method
// get, post, put, delete
// 이중 put과 delete는 ajax를 사용해야만 구현이 됨
router.put('/update/:id' , (req,res)=>{

    
    var id = req.params.id
    galleryVO.update({_id:id}, {$set : req.body}).exec((err, data)=>{
        
        if(err){
            res.json({
                msg: 'UPDATE FAILE',
                data : data
            })
        }else {
            res.json({

                msg: 'OK',
                data: data

            })
        }


//        res.redirect('/gallery/view/' + data)
    })


})


router.get('/upload',(req,res)=>{
    var gallery = new galleryVO()
    res.render('gallery/upload',{gallery:gallery})
})


/*

    파일 업로드 하기
    1. multer를 사용해서 생성해 둔 saveFile() 함수를 사용해서 파일을 업로드 하고
    2. saveFile() callback 함수 내에서 변경된 파일이르을 추출하고 DB에 저장

*/
router.post('/upload', (req,res)=>{

    saveFile(req,res,(err)=>{           // req.body 제외 req.file 만?

        if(err){
            console.log(err)
            res.send('파일 업로드 오류')
        }else{

            // 원래 req.file 객체는
            // web form에서 업로드한 파일에 대한 정보만 담겨 있음
            // 그중 .originalname은 원본 파일이름
            let originalname = req.file.originalname
            // 마치 web form에 input tag에 gOriginalPhtoName tag가  그곳에 originalname 값이 세팅
            req.body.gOriginalPhotoName = originalname

            // 원래 tag에 있던 gUploadPhtoName에는 새로 변경된 파일 이름을 저장
            // req.file.filename은 saveOptions에서 설정된 filename의 값이 세팅되어 있음
            req.body.gUpLoadPhotoName = req.file.filename

            var vo = new galleryVO(req.body)
            vo.save((err,date)=>{

                res.redirect('/gallery')

            })


        }

    })

})

module.exports = router