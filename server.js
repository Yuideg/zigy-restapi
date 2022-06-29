var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
require("./api/models/userModel");
require('dotenv').config();
//Environmental Variables
var port = process.env.PORT || 9090;
//Option:01 
// Connect to MongoDB in local machine running
const connectionString = "mongodb://127.0.0.1:27017/newzigy?directConnection=true&serverSelectionTimeoutMS=2000";
//Option:02
//mongodb connecttion string in docker container 
// const connectionString = "mongodb://mongo:27017/newzigy";

const options = {
    useNewUrlParser: true,
};
mongoose
    .connect(connectionString, options)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
var routes = require("./api/routes/Routes");
routes(app);
app.listen(port, () => {
    console.log(`localhost is running in http://localhost:${port}`);
});