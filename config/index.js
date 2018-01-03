var configFile = "prod";
var lastArg = process.argv.pop();

if(lastArg == "dev") configFile = "dev";
if(lastArg == "local") configFile = "local";
//console.log(process.argv)
console.log("Using Config : " + configFile);

module.exports = require("./"+configFile);