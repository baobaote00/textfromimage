const express = require("express");
const routes = require("./routes");
var fileupload = require("express-fileupload");
var bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
//if you want in every domain then
app.use(cors())
app.use(bodyParser.json());
app.use(fileupload());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});
const port = process.env.PORT || "1337";
app.set("port", port);

app.use('/', routes);

app.listen(port, () => console.log(`Server running on localhost:${port}`));