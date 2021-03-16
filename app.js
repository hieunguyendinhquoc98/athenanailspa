var express = require('express');
var index = require('./apps/routes/index');
var bodyParser = require("body-parser");
var session = require('express-session');
var passport = require('passport');
var morgan = require('morgan');
var flash = require("connect-flash");
var port = process.env.PORT|| 3000;
var hbs_sections = require('express-handlebars-sections');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: '"cats"',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) =>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    
    next();
});
// require('./apps/middlewares/upload')(app);

//set up engine 
app.set("views", __dirname + "/apps/views")
app.set("view engine", "hbs");
var handlebars = require("express-handlebars").create({
  extname: 'hbs',
  defaultLayout: 'index',
  layoutsDir: __dirname + "/apps/views",
  partialsDir: [
    __dirname + '/apps/views/partial'],
    helpers: {
        section: hbs_sections()
    }
});
app.engine('hbs', handlebars.engine);
//set moment helper for handlebars
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

//static folder for resources
app.use(express.static(__dirname + '/publics'));

app.use('/',index);

app.listen(port, function () {
    console.log('express-handlebars example server listening on: %d', port);
});
