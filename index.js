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
const port = process.env.PORT || "1337";
app.set("port", port);

app.use('/', routes);

app.listen(port, () => console.log(`Server running on localhost:${port}`));