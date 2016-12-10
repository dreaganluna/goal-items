// ================== //
// INIT FUNCTIONS:    //
// ================== //


var init = function()
{
	Winston.verbose('hello');
};


// ================== //
// INIT:              //
// ================== //


var Winston = require('./lib/log.js')("goal-items");

init();