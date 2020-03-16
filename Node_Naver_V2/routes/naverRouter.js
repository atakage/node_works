var express = require('express')
var router = express.Router()
var naverConfig = require('../config/naver_secret')
var request = require('request')
var bookVO = require('../model/bookVO')


var reqOptions = (api_url)=>{

    var options= {
        url : api_url,
        headers: {
            'X-Naver-Client-Id' : naverConfig.client_id,
            'X-Naver-Client-Secret' : naverConfig.client_secret
        }

    }

    return options

}


router.get('/list', function(req,res){


 
    var searchVal = req.query.searchVal
    let api_url = naverConfig.book_url
    api_url += "?query=" + encodeURI(searchVal)

// console.log(api_url)

    request.get(reqOptions(api_url), function(err,response,body){


        

        
     
        
        if(err){

            console.log(err)
            res.send(response.statusMessage)

        }else if(response.statusCode == 200){

            var jsonResult = JSON.parse(body).items


           
                        bookVO.findOne({searchVal : searchVal}).exec(function(err, searchValResult){

                           console.log(searchValResult)

                            if(searchValResult == null){

                                
                                var bookList = jsonResult

                                console.log("북렝스:" + bookList.length)


                                for(var i = 0; i < bookList.length-1; i++){
                    
                    
                                    bookList[i].searchVal = searchVal
                                    console.log(bookList[i])
                    
                                }
                               


                               // console.log("북"+bookList)


                               bookVO.collection.insertMany(bookList, function(err, result){


                                console.log("-----------------------------------------------------")
                                console.log(result)


                                    if(err){
                                        res.send("Data Insert Error")
                                    }else{

                                       

                                        res.render("index",{whereVal:'새 검색어, DB에 추가 입력함'})
                                    }

                               })


                               

                            }     

                            // 값 이미 존재할 시 db에서 select 하기
                            bookVO.find({searchVal : searchVal}, function(err, result){

                                console.log('이미존재값' + result)
               
                                res.render("index",{bookList:result, whereVal:'이미 존재, db에서 가져옴'})

                            })
                           
                            


                            







                            


                        })

            

        }else{

            res.send('unknown error')
        }



    })

    



    

    

});




module.exports = router