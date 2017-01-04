// INIT:
var Mongo = require('mongodb');
var MongoClient = Mongo.MongoClient;
var Winston = require("./log.js")("goal-items");

// classes & schema's
var Film = require('../classes/film.js').Film;

// constants
var _db;
var _mongoUrl = "";


// ================== //
// PUBLIC METHODS:    //
// ================== //


var exports = module.exports = {};
exports.create = function(obj, type, callback)
{
	var item = createItemObject(type, obj);

	saveToMongo(item, function(err)
	{
		callback(err);
	})
}


exports.get = function(type, id, callback)
{
	// try to create a mongoDB objectId
	try
	{
		var itemId = new Mongo.ObjectID(id);
	}
	catch(err)
	{
		return callback(new Error("Item not found."));
	}

	// get item from mongoDB
	getItemFromMongo({"_id": itemId}, function(err, item)
	{

		callback(err, createItemObject(type, item));
	});
};


exports.getAll = function(type, callback)
{
	_db.collection("items").find({"type": type}).toArray(function(err, result)
	{
		// loop through results and create correct objects
		var i = 0;
		var iLength = result.length;
		for(i; i < iLength; i++)
		{
			result[i] = createItemObject(type, result[i]);
			delete result[i].__v;
		}

		callback(err, result);
	});
};


exports.init = function(mongoUrl, callback)
{
	_mongoUrl = mongoUrl;

	MongoClient.connect(_mongoUrl, function(err, db)
	{
		_db = db;
		callback(err);
	});
};


// ================== //
// PRIVATE METHODS:   //
// ================== //


var createItemObject = function(type, obj)
{
	switch(type)
	{
		case "film":
			return new Film(obj);
			break;
	}
};


var getItemFromMongo = function(query, callback)
{
	_db.collection('items').findOne(query, function(err, result)
	{
		if(err) return callback(err);
		if(!result) return callback(new Error("Item not found."));
		callback(err, result);
	});
};


var saveToMongo = function(item, callback)
{
	_db.collection('items').insert(item, function(err, result)
	{
		if(err) return callback(err);
		callback();
	});
};