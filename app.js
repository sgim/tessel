var path = require("path");
var express = require("express");
var app = express();
var socketio = require('socket.io');
var morgan = require("morgan");

app.use(morgan("dev"));

var bodyParser = require('body-parser'),
    urlEncoder = app.use(bodyParser.urlencoded({ extended: true })),
    jsonEncoder = app.use(bodyParser.json());

app.get("/", (req,res,next) => {
  res.sendFile(__dirname + "/jaws.html");
});

app.use("/", express.static(__dirname));
app.use(express.static(__dirname + '/public'));

var server = app.listen(3000);
var io = socketio.listen(server);

app.get("/:action", (req, res, next) => {
	console.log("hey there!");
	io.sockets.emit(req.params.action);
	res.send(req.params.action);
});
