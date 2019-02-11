
const Winston = require('winston')

/**
 * define the custom settings for each transport (file, console)
 */
const options = {
  file: {
    level: 'info',
    filename: `app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
}

/**
 * instantiate a new Winston Logger with the settings defined above
 */
const Logger = new Winston.createLogger({
  transports: [
    new Winston.transports.File(options.file),
    new Winston.transports.Console(options.console)
  ],
  exitOnError: false // do not exit on handled exceptions
})

/**
 * create a stream object with a 'write' function that will be used by `morgan`
 */
Logger.stream = {
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    Logger.info(message)
  }
}

module.exports = Logger
