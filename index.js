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
	});
};


// ================== //
// INIT:              //
// ================== //


var _config;
var Config  = require("./lib/config.js");
var Restify = require('restify');
var Winston = require('./lib/log.js')("goal-items");

init();