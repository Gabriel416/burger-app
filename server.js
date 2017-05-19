var express = require('express');
var bodyParser = require("body-parser");
var methodOverride = require('method-override')
var exphbs = require("express-handlebars");
var mysql = require('mysql');


var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
var port = process.env.PORT || 8080;

var connection = mysql.createConnection(process.env.JAWSDB_URL || {
    port: 3306,
    host: "localhost",
    user: "root",
    //ENTER YOUR PASSWORD HERE
    password: "2gk58d70",
    database: "task_db"
});

connection.connect();

app.get("/", function(req, res) {
    console.log("server firing");
    connection.query("SELECT * FROM tasks", function(err, data) {
        if (err) throw err;
        res.render("index", { task: data });
    });
});

app.post("/new", function(req, res) {
    connection.query("INSERT INTO tasks (task_name) VALUES (?)", [req.body.task], function(err, data) {
        res.redirect("/");
    });
});

app.put("/update", function(req, res) {
	connection.query("UPDATE tasks SET task_name = ? WHERE id = ?", [req.body.task, req.body.id], function(err, data) {
		res.redirect("/");
	});
});

app.delete("/delete", function(req, res) {
	connection.query("DELETE FROM tasks WHERE id = ?", [req.body.id], function(err, data) {
		res.redirect("/");
	});
});

app.listen(port, function() {
    console.log("server listening on " + port);
});
