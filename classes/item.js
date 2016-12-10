var Class = require('node-class').class;

exports = module.exports = {};
exports.Item = Class('Item', {
	// properties
	name: "",
	description: "",
	type: "",
	percCompleted: 0,
	percLeft: 100,
	timeEstimated: 0, // in milliseconds
	timeSpent: 0, // in milliseconds
	completed: false,
	inInitialGoal: true,
	dateCreated: null,
	dateModified: null,
	image: null,
	dropped: false,
	year: "",
	__v: 0,

	// constructor
	initialize: function (){}
}, true);