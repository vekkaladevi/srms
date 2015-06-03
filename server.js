/**
 * Created by vijaye on 9/22/2014.
 */


var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var routes = require('./routes');

var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var ReactEngine = require('express-react-engine');

// create the Express application
var app = express();

//all environments
app.set('views', __dirname + '/views');

// Use react-views as rendering engine
app.set('view engine', 'jsx');
app.engine('jsx', ReactEngine());



app.use(express.static(path.join(__dirname, 'public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());


app.use(expressSession({secret: 'abcdefgh!@#$%',
                        resave: false, // don't save session if unmodified
                        saveUninitialized: false //don't create session until something is stored
                       }));
app.use(cookieParser());

//Session-persisted message middleware
app.use(function(req, res, next){
  delete req.session.error;
  delete req.session.success;
  next();
});


function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}

// Create the Express router
var router = express.Router();

// all requests to this router will first hit this middleware
router.use(function(req, res, next){
    // log each request to the console
    console.log("%s %s %s \n", req.method, req.path, req.url);
    // continue doing what we were doing and go to the route
    next();
});


// home page route

router.get('/', routes.index);

/*
router.route('/signup')
  .post(function(req, res) {
      console.log(req.body);
    // job for mongo.
    user.signup(req.body)
      .then(function(status) {
	  console.log("Signup response");
	  res.send({result: status});
      })
      .catch(function(err){
	  res.status(500).send({err:err})
      })    
  });


router.route('/login')
  .post(function(req, res) {
      user.authenticate(req.body.email, req.body.password)
	  .then(function(username) {
	      //TODO: record login time for analytics
	      res.send({userName: username});
	  })
	  .catch(function(err) {
	      res.status(500).send({err:err})
	  })
  });

router.route('/logout')
  .post(function(req, res) {
      // TOOD: Delete session, mark logout time for analytics
      res.send({result: "Logout success"});

  });


*/


// apply the routes to our application
app.use('/', router);

// Start the server
var port = process.argv[2] || 3000;
    var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});

    
