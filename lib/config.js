exports = module.exports = {};
exports.getFromFile = function(fileName, callback)
{
	// default filename
	if(typeof fileName === "undefined")
	{
		fileName = config.json;
	}

	// load in json config file
	try
	{
		var config = require('../' + fileName);
	}
	catch(e)
	{
		var err = new Error("config file not found");
		callback(err);
		return;
	}

	// validate config
	if(config === null || typeof config !== "object" || typeof config === "undefined" || Object.keys(config).length === 0)
	{
		var err = new Error("invalid config file");
		callback(err);
	}
	else
	{
		callback(null, config);
	}
};