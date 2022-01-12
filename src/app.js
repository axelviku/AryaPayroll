const express = require('express');
require("./db");
const Student = require("./models/user");
const cookieParsar = require("cookie-parser");
const session = require('express-session');

var cors = require('cors');




const mongoose = require('mongoose');
const router = require('./router/router');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParsar());
app.use(express.urlencoded({extended: true}));

const oneDay = 200000;
app.use(session({
    secret: "mynameisvikrant",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

const port = process.env.PORT || 3002;



app.use(router);


app.listen(port, () => {
    console.log(`listen on port ${port}`);
});

