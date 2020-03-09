var mong = require('mongoose')
var bookModel = mong.Schema({



bTitle : {
    
    type: String,
    unique : true,
    trim: true
},

bWriter : {

    type: String,
    
    trim: true

},

bComp : {

    type: String,
    
    trim: true
},

bPrice : Number

})

module.exports = mong.model('book', bookModel)