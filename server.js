var express = require("express");
var fs = require("fs");
var app = express();
const { execFile } = require("child_process");

app.get("/", function (req, res) {
  res.send("Welcome To War");
});

//uses execFile to execute game logic within child process
app.get("/start", function (req, res) {
  res.send("War game has started.");
  execFile(__dirname + "/play_war.js", (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    console.log(`stdout:\n${stdout}`);
  });
});

//get score from json file
app.get("/score", function (req, res) {
  fs.readFile(__dirname + "/" + "./data/score.json", "utf8", function (err, data) {
    console.log(data);
    res.end(data);
  });
});

var server = app.listen(8081, function () {
  var host = "localhost";
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});

module.exports = server;
