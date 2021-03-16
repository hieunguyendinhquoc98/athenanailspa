var galleryDB = require('../model/gallery');

module.exports = (req, res, next) => {
    galleryDB.findAll().then(rows =>{
        res.locals.lcListGallery = rows;
        console.log('emp');
        next();
    }).catch(err => {
        console.log(err);
    });
}