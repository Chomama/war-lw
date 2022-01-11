var express = require("express");
var fs = require("fs");
var app = express();
const { execFile } = require("child_process");

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.send("Welcome To War");
});

app.get("/start", function (req, res) {
  execFile(__dirname + "/start_war.js", (error, stdout, stderr) => {
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

app.get("/score", function (req, res) {
  fs.readFile(__dirname + "/" + "score.json", "utf8", function (err, data) {
    console.log(data);
    res.end(data);
  });
});

var server = app.listen(8081, function () {
  var host = "localhost";
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
