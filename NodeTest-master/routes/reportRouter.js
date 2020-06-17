var express = require('express');
var router = express.Router();

router.get('/dumpReport', function(req,res){
    res.send('55');
})

module.exports = router;