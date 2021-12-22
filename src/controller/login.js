const express = require('express');
const router = new express.Router();
const Student = require("../models/user");
const {success, error} = require("./mesage");
const bcrypt = require('bcryptjs');
const cookieParsar = require("cookie-parser");
const session = require('express-session');


const login = async (req, res) => {
    console.log(req.body);
    var session = req.session;
    // console.log(req.session.tokens); 
    try {
        const email1 = req.body.email;
        const pass1 = req.body.password;
    //    console.log(req.session.tokens); 
        try {
            const data = await Student.findOne({ email: email1 });
            console.log(data);
            const isMatch = await bcrypt.compare(pass1, data.password);
            console.log('isMatch');
            if (isMatch) { 
                console.log("after match");
                res.send(success("login Successfully...!!!",data));
            }
            else {
                console.log("hit");
                res.send(error("Email and Pasword Invalid...!!!"));

            }
        }
        catch (err) {
            res.send(error("Email and Pasword Invalid...!!!"));
        }
    } catch (error) {
        res.send(error("Server side error...!!!"));
    }


};

module.exports = login;