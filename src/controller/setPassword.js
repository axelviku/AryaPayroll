const express = require('express');
const router = new express.Router();
const Student = require("../models/user");
const { success, error } = require("./mesage");
const main = require("./mailer")
const bcrypt = require('bcryptjs');
const cookieParsar = require("cookie-parser");
const session = require('express-session');
// setPass=module.exports;


// var session = req.session;
var setPass = async (req, res) => {
    // const token = await Student.findOne({tokens});


    try {
        var vk;
        const token1 = req.body.token;
       if( vk=await Student.findOne({'registrationToken.token':token1})){
           console.log(vk);
            try {
                const pass1 = req.body.password;
                const confirmPass1 = req.body.passwordConfirmation;
                if (pass1 === confirmPass1) {
                    const passwordHash = await bcrypt.hash(pass1, 10);
                    const email = vk.email;
                    const updateData = await Student.findOneAndUpdate({ email: email }, { $set: { password: passwordHash } }, { new: true, useFindAndModify: false });
                    res.send(success("Password Update Successfull", updateData));
                }
                else {
                    res.send(error("password not match"));
                }

            } catch (err) {
                res.send(error("Enter valid Email"));
            }
        } else {
            res.send(error("token not match"));
        }
    } catch (err) {
        res.send(error("Techncal Error"));
    }
};
module.exports = setPass;
