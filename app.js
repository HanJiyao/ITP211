var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');

// Warning flash
var flash = require('connect-flash');
app.use(flash());

// Import multer
var multer = require('multer');
var upload = multer({ dest: './public/uploads/', limits: { fileSize: 1500000, file: 1 } });

//For BodyParser cookieParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Modules to store session
var database = require('./server/controllers/database');
var expressSession = require('express-session');
var SessionStore = require('express-session-sequelize')(expressSession.Store);
var sequelizeSessionStore = new SessionStore({
    db: database.sequelize,
});
// Secret for Session
app.use(expressSession({
    secret: 'sessionStore',
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: false,
}));

// For Passport
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//For View Engine
app.set('views', path.join(__dirname, 'server/views/pages'));
app.set('view engine', 'ejs');

//Models
var models = require("./server/models");

//Passport Routes
var authRoute = require('./server/routes/auth.js')(app, passport);

//load passport strategies
require('./server/config/passport.js')(passport, models.Users);

// Setup public directory
app.use(express.static(path.join(__dirname, 'public')));

// Isolated Routes
var indexRouter = require('./server/routes/index');
app.use('/', indexRouter)
//var productController = require("./server/controllers/product");
var productRouter = require('./server/routes/product')
app.use("/products", productRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

var serverPort = 3000;
var httpServer = require('http').Server(app);
app.set('port', serverPort);
var server = httpServer.listen(app.get('port'), function () {
    console.log('http server listening on port: ' + server.address().port);
});
