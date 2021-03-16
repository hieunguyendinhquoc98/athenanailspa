var express = require('express');
var router = express.Router();
var bookDb = require('../model/schedule_book');
router.use(require('../middlewares/local.mdw'));
router.use(require('../middlewares/local.mdw.employees'));
router.use(require('../middlewares/local.mdw.gallery'));
// router app
router.use("/", require('./home'));
router.use("/contact", require('./contact'));
router.use("/aboutus", require('./aboutus'));
router.use("/services", require('./service'));
router.use("/promotion", require('./promotion'));
const { ensureAuthenticated, forwardAuthenticated } = require('../middlewares/local.mdw.auth');

router.use("/admin", ensureAuthenticated ,require('./admin/index'));

router.use("/login", forwardAuthenticated, require('./admin/login'));
router.use("/logout", require('./admin/logout'));

router.post("/booking", (req, res) => {
    var entity = req.body;
    if (entity) {
        var rs = bookDb.addScheduleBook(entity);
        //TODO: add field created by and author name
        rs.then(row => {
            console.log("Add schedule success");
            res.json(row.insertId);
        }).catch(err => {
            console.log('Add schedule failed cause: ' + err);
        });
    }
});

module.exports = router;