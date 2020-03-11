var username = {login:true, userid:korea}
var str = username && name.login && name.userid

let n1 = 0
let n2 = 0
let sum = ++n1 > 0 || ++n2 > 0



function userIdCheck(userId){
    
    if(!userId){
        userId = 'id없음'
    }

}


// userId값이 있나 없나  검사할 때
function userIdCheck(userId){
    userId = userId || 'id없음'
}