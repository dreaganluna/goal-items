// ================== //
// INIT FUNCTIONS:    //
// ================== //


var init = function()
{
	Config.getFromFile("config.json", function(err, config)
	{
		if(err)
		{
			Winston.error(err.message);
			process.exit();
		}

		_config = config;
		Winston.info('Started with the following config', _config);

		initRestify();
	});
};


var initRestify = function()
{
	// create server
	var server = Restify.createServer({'name': 'goal-items'});
	server.use(Restify.fullResponse());
	server.use(Restify.bodyParser());
	server.use(Restify.queryParser());

	server.on("uncaughtException", onUncaughtException);
	server.use(mainHandler);

	server.listen(_config.port, serverUpHandler);
};


var mainHandler = function(request, result, next)
{
	Winston.log('info', 'Incoming call: ' + request.method + ' ' + request.url);

	next();
};


var onUncaughtException = function(request, response, route, err)
{
	Winston.error("Uncaught Exception:\n", err);
	response.send(err); // Resume default behaviour.
}


var serverUpHandler = function()
{
	Winston.log('info', 'Restify server up and running on port ' + _config.port);
};



// ================== //
// INIT:              //
// ================== //


var _config;
var Config  = require("./lib/config.js");
var Restify = require('restify');
var Winston = require('./lib/log.js')("goal-items");

init();