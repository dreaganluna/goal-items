var Winston = require('winston');
var logger = function(file, path)
{
	path = path || '/var/log/node';
	var logObject =  new (Winston.Logger)({
		transports: [
		new (Winston.transports.Console)(),
		new (Winston.transports.File)({
			'filename': '/var/log/node/'+ file +'.log',
			'level': 'verbose',
			'json': false ,
			'handleExceptions': true,
			'humanReadableUnhandledException': true,
			'maxsize': 5000000,
			'maxFiles': 5,
			'tailable': true})
		]
	});

	logObject.remove(Winston.transports.Console);
	logObject.add(Winston.transports.Console, {'timestamp':true, 'level': 'verbose', 'colorize':true});
	return logObject;
}

module.exports = logger;