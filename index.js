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

		// init lib
		Item.init(_config.mongo);

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

	server.get("/films/:id", getFilm);
	server.post("/films", createFilm);

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
// SERVER FUNCTIONS:  //
// ================== //


var createFilm = function(request, response, next)
{
	
	validateBody(request.body, 'film', function(err, body)
	{
		if(err)
		{
			Winston.error(err);
			return response.send(400, err.message);
		}

		Item.create(body, 'film', function(err)
		{
			if(err)
			{
				Winston.error(err);
				return response.send(err);
			}

			response.send(201);
		});
	});
	next();
};


var getFilm = function(request, response, next)
{
	Item.get(request.params.id, function(err, item)
	{
		if(err)
		{
			Winston.error(err);
			return response.send(err);
		}
		
		return response.send(item);
	});
	next();
};


// ================== //
// HELPER FUNCTIONS:  //
// ================== //


var validateBody = function(obj, schema, callback)
{
	var validation = Joi.validate(obj, Schema(schema));
	if(validation.error)
	{
		return callback(validation.error, validation.value);
	}
	callback(null, validation.value);
};


// ================== //
// INIT:              //
// ================== //


var _config;
var Config  = require("./lib/config.js");
var Joi     = require('joi');
var Restify = require('restify');
var Winston = require('./lib/log.js')("goal-items");

// INIT libs & schema's
var Item = require('./lib/item.js');
var Schema = require('./schema/item.js').schema;

init();