var express = require('express');
var router = express.Router();
const path = require('path');
var listAdminServiceModel = require('../../model/list_services');
router.get('/', (req, res) => {
    var s = listAdminServiceModel.findAll();
    s.then(rows => {
        res.render('admin/service_admin', {
            layout: 'layouts/main_admin',
            services: rows,
        });
    }).catch(err => {
        console.log(err);
    });
});
router.get('/edit', (req, res) => {
    var rs = listAdminServiceModel.findServiceById(req.query.id);
    rs.then(rows => {
        res.render('admin/edit_services_admin', {
            layout: 'layouts/main_admin',
            id: req.query.id,
            dataService: rows,
        });
    }).catch(err => {
        console.log(err);
    });
});
router.get('/add', (req, res) => {
    res.render('admin/add_services_admin', {
        layout: 'layouts/main_admin',
    });
});
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './publics/img/upload');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
var upload = multer({ storage });
router.post('/upload', (req, res, next) => {
    upload.single('fuMain')(req, res, err => {
        if (err) {
            return res.json({               
                error: err.message
            });
        }
        else {
            return res.json({});
        }

    })
})
router.post("/add", (req, res) => {
    var entity = req.body;
    if (entity) {
        var rs = listAdminServiceModel.addListService(entity);
        rs.then(row => {
            console.log("Add service success");
            res.json(row.insertId);
        }).catch(err => {
            console.log('Add service failed cause: ' + err);
        });
    }
})
router.post("/edit", (req, res) => {
    var entity = req.body;
    console.log(req.query.id)
    if (entity) {
        var rs = listAdminServiceModel.updateListService(req.query.id,entity);
        rs.then(row => {
            console.log("Update service success");
            res.redirect('/admin/services-details')
        }).catch(err => {
            console.log('Update  service failed cause: ' + err);
        });
    }
})
router.post("/delete", (req, res) => {
    if (req.body.id) {
        var rs = listAdminServiceModel.deleteListService(req.body.id);
        rs.then(row => {
            console.log("delete service success");
            res.redirect('/admin/manage-services')
        }).catch(err => {
            console.log('detele  service failed cause: ' + err);
        });
    }
})
module.exports = router;
