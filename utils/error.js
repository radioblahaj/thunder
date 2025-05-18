const path = require("path");

 function errorLoggger(error, dirname) {
    console.error(dirname, error)
}

module.exports = { errorLoggger }