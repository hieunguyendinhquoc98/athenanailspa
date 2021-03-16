var express = require('express');
var router = express.Router();
router.use(require('../../middlewares/local.mdw'));
router.use(require('../../middlewares/local.mdw.user'));


// router admin
router.use("/", require('./booking.admin'));
router.use("/manage-services", require('./list_service.admin'));
router.use("/services-details", require('./service_details.admin'));
module.exports = router;
