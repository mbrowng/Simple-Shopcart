const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const apiRoutes = require("./api-routes");

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));

mongoose.connect("mongodb://localhost:27017/walmart", { useNewUrlParser:true });
var db = mongoose.connection;

if(!db){
    console.log("Error Connecting db");
} else {
    console.log("Db connected successfully")
}

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// simple route
app.get("/", (req,res) =>{
    res.json({message: "Welcome!!"});
});

app.use("/api", apiRoutes)

/*app.get("/products", (req,res) =>{
    res.json({message:"Holo!"});
});*/

/*
const db = require("./app/models");
const { mongoose } = require("./app/models");
db.mongoose.connect(
    db.url, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(
        () => {
            console.log("Connected to Mongo!");
        }
    ).catch(
        err => {
            console.log("Cannot connect to the database!", err);
            process.exit();
        }
    );


// import routes
//const apiRoutes = require("./api-routes");

//Use Api routes in the App
//app.use('/api', apiRoutes);*/