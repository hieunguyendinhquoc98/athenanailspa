var express = require('express');
var router = express.Router();
var listDetailsAdminServicesModel = require('../../model/service_detail');var id;
router.get('/', (req, res) => {
    if (req.query.id != null) {
        id = req.query.id; clearImmediate;
    } else {
        id = 1;
    }
    var d = listDetailsAdminServicesModel.loadServiceDescription('service_detail', id)
    d.then(a => {
        console.log(a);
        res.render('admin/service_detail_admin', {
            layout: 'layouts/main_admin',
            servicesDetail: a,
            id: id
        });
    }).catch(err => {
        console.log(err);
    });
});
router.get('/add', (req, res) => {
        res.render('admin/add_service_detail', {
            layout: 'layouts/main_admin',
        });
});
router.get('/edit', (req, res) => {
    var rs = listDetailsAdminServicesModel.findServiceDetails(req.query.id);
    rs.then(rows => {
        res.render('admin/edit_service_detail', {
            layout: 'layouts/main_admin',
            id: req.query.id,
            dataService: rows,
        });
    }).catch(err => {
        console.log(err);
    });
});
router.post("/add", (req, res) => {
    var entity = req.body;
    if (entity) {
        var rs = listDetailsAdminServicesModel.addServiceDetails(entity);
        rs.then(row => {
            console.log("Add service success");
            res.json(row.insertId);
            res.redirect('/admin/services-details')
        }).catch(err => {
            console.log('Add service failed cause: ' + err);
        });
    }
})
router.post("/edit", (req, res) => {
    var entity = req.body;
    console.log(req.query.id)
    if (entity) {
        var rs = listDetailsAdminServicesModel.updateServiceDetails(req.query.id,entity);
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
        var rs = listDetailsAdminServicesModel.deleteServiceDetails(req.body.id);
        rs.then(row => {
            console.log("delete service success");
            res.redirect('/admin/services-details');
        }).catch(err => {
            console.log('detele  service failed cause: ' + err);
        });
    }
})
router.get("/deleteall", (req, res) => {
    if (req.query.id) {
        var rs = listDetailsAdminServicesModel.deleteallServiceDetails(req.query.id);
        rs.then(row => {
            console.log("delete service success");
            res.redirect('/admin/services-details');
        }).catch(err => {
            console.log('detele  service failed cause: ' + err);
        });
    }
})
module.exports = router;