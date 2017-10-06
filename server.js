var express=require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

// Sets up the Express App
// =============================================================
var app = express();
var port = process.env.PORT || 3000;


// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tucuman254",
  database: "burgerK_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// Use Handlebars to render the main index.html
app.get("/", function(req, res) {   
    connection.query("SELECT * FROM burgers;", function(err, data) {
        if (err) {
          return res.status(500).end();
        }
        res.render("index",{burgers:data});
     });
});

// Create a new burger
app.post("/addBurger", function(req, res) {
    connection.query("INSERT INTO burgers (burger) VALUES (?)", [req.body.burger], function(err, result) {
      if (err) {
        return res.status(500).end();
      }
      // Send back the ID of the new burger
      res.json({ id: result.insertId });
      console.log({ id: result.insertId });
    });
  });





  app.listen(port, function() {
    console.log("listening on port", port);
  });