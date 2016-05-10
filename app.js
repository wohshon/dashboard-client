
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , dashboard=require('./routes/dashboard')
  , path = require('path')
  , app = express()
  , fs = require('fs')
  , http = require('http').Server(app)
  , dl = require('delivery')
  , io = require('socket.io')(http);
var options = {
		  key: fs.readFileSync('./key.pem'),
		  cert: fs.readFileSync('./cert.pem')
		};

var https=require('https').createServer(options,app);
io=require('socket.io')(https);
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', routes.index);
app.get('/client', dashboard.client);

//non testing routes
app.get("/dashboard-client",dashboard.dashboardclient);

https.listen(app.get('port'), function(){
	  console.log('Express server listening on port '+ app.get('port'));
});

