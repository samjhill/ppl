
var mongojs = require("mongojs");

var databaseURI = "ppl";
var db = mongojs(databaseURI, ["users", "movements"]);

module.exports = db;