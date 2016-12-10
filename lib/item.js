// INIT:
var Winston = require("./log.js")("goal-items");

// classes & schema's
var Film = require('../classes/film.js').Film;


// ================== //
// PUBLIC METHODS:    //
// ================== //


var exports = module.exports = {};
exports.create = function(obj, type, callback)
{
	var item;
	switch(type)
	{
		case "film":
			item = new Film(obj);
			break;
	}

	Winston.verbose(JSON.stringify(item));

	callback();
}


// ================== //
// PRIVATE METHODS:   //
// ================== //

