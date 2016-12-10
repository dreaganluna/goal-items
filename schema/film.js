// save this as carSchema.js
var Joi = require('joi')

module.exports = {
	duration: Joi.number().required(), // in milliseconds
	chosenBy: Joi.string().optional().default('me'),
	releasedThisYear: Joi.boolean().optional().default(false),
	acquiredThisYear: Joi.boolean().optional().default(false),
	locationWatched: Joi.string().optional().valid(["home", "cinema", "other"]),
	genre: Joi.string().required(),
	watchedWith: Joi.string().optional().valid(["alone", "gf", "others"])
}