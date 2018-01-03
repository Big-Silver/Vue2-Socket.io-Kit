const winston = require('winston');

module.exports = function (config) {
	var self = this;
	self.config = config;

	self.init = (allDone) => {
		allDone()
	}

	self.log = (level, log) => {
		var logger = new (winston.Logger)({
			transports: [
				new (winston.transports.File)({
					name: `${level}-file`,
					filename: `chratos-log-${level}.log`,
					level: level
				})
			]
		});
		logger.log(level, log);
	}

	self.error = (log) => {
		self.log('error', log);
	}

	self.warn = (log) => {		
		self.log('warn', log);
	}

	self.info = (log) => {
		self.log('info', log);
	}

	self.debug = (log) => {
		self.log('debug', log);
	}

	self.exception = (log) => {
		var logger = new (winston.Logger)({
		    exceptionHandlers: [
		      new winston.transports.File({ 
		      	name: 'exception-file', 
		      	filename: 'chratos-log-exception.log', 
		      	timestamp: true, 
		      	maxsize: 1000000 
		      })
		    ],  
		    exitOnError: false, // <--- set this to false
		});
		logger.log('error', log);

	}
}