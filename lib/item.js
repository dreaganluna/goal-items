// INIT:
var MongoClient = require('mongodb').MongoClient;
var Winston = require("./log.js")("goal-items");

// classes & schema's
var Film = require('../classes/film.js').Film;

// constants
var _mongoUrl = "";


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

	saveToMongo(item, function(err)
	{
		callback(err);
	})
}


exports.init = function(mongoUrl)
{
	_mongoUrl = mongoUrl;
};


// ================== //
// PRIVATE METHODS:   //
// ================== //


var saveToMongo = function(item, callback)
{
	MongoClient.connect(_mongoUrl, function(err, db)
	{
		db.collection('items').insert(item, function(err, result)
		{
			db.close();
	
			if(err) return callback(err);
			callback();
		});
	});
};