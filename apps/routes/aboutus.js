var express = require('express');
var router = express.Router();

router.get('/', (req, res)=>{
    res.render('client/about_us', {layout: 'layouts/main'});
});

module.exports = router;