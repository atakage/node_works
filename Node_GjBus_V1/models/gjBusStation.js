var mongoose = require('mongoose')

var gjStationVO = mongoose.Schema({



    STATION_LIST : String, //			
    STATION_NUM : String,//	레코드 구분	5	1
    BUSSTOP_ID : String,//	정류소 ID	5	1
    BUSSTOP_NAME : String,//	정류소 명(국문)	30	1
    NAME_E : String,//	정류소 명(영문)	60	1
    LONGITUDE : String,//	위도	13	1
    LATITUDE : String,
    ARS_ID : String,
    NEXT_BUSSTOP : String

})

module.exports = mongoose.model('gjstation' , gjStationVO)

