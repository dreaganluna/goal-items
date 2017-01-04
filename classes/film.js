var Class = require('node-class').class;
var Item = require('./item.js').Item;

exports = module.exports = {};
exports.Film = Class('Film', {
	extends: ["Item"],

	// properties
	duration: 0, // in milliseconds
	chosenBy: "me",
	releasedThisYear: false,
	acquiredThisYear: false,
	locationWatched: "",
	genre: "",
	watchedWith: "",

	// constructor
	initialize: function()
	{
		this.__parent();
		return this;
	}
}, true);