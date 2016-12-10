var Joi = require('joi');

var exports = module.exports = {};
exports.schema = function(subSchema)
{
	var schema = {
		name: Joi.string().required(),
		description: Joi.string().optional().allow('').allow(null),
		type: Joi.string().valid(["comic", "book", "film", "tvserie", "manga", "videogame"]),
		percCompleted: Joi.number().optional().default(0),
		percLeft: Joi.number().optional().default(100),
		timeEstimated: Joi.number().required(), // in milliseconds
		timeSpent: Joi.number().optional().default(0), // in milliseconds
		completed: Joi.boolean().optional().default(false),
		inInitialGoal: Joi.boolean().optional().default(true),
		dateCreated: Joi.string().optional().allow(null),
		dateModified: Joi.string().optional().allow(null),
		image: Joi.string().optional().allow('').allow(null),
		dropped: Joi.boolean().optional().default(false),
		year: Joi.string().required()
	};

	// extend schema with specific type requirements
	var schema = Object.assign(schema, getSubSchema(subSchema));

	return Joi.object().keys(schema);
};

var getSubSchema = function(subSchema)
{
	switch(subSchema)
	{
		case "film":
			return require('./film.js');
			break;
	};
};