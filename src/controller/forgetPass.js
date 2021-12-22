const express = require('express');
const router = new express.Router();
const Student = require("../models/user");
const { success, error } = require("./mesage");
const main = require("./mailer")
const bcrypt = require('bcryptjs');
forget_Pass=module.exports;
var email1;
var otp_message;
forget_Pass.send_otp = async (req, res) => {
    var data;
    try {
        console.log(req.body);
         email1 = req.body.email;
        console.log("h");
        

        if (data = await Student.findOne({ email: email1 })) {
            console.log("bye");
            otp_message = Math.floor((Math.random() * 9999) + 1000);

            (main(email1, "OTP", otp_message));

            // res.render("otpVerify");
            res.send(success("otp sent successfully",otp_message));


        } else {
            res.send(error("Enter valid email"));
        }


    } catch (err) {
        res.status(400).send(err);
    }
};
forget_Pass.forgetPass = async (req, res) => {
    try {

        // const email1 = req.body.email;
        const otp1 = req.body.otp;
        const pass1 = req.body.password;


        if (`${otp_message}` === otp1) {
            try {
                console.log("bye");
                const passwordHash = await bcrypt.hash(pass1, 10);
                const updateData = await Student.findOneAndUpdate({ email: `${email1}` }, { $set: { password: passwordHash } }, { new: true, useFindAndModify: false });
                console.log("hi");
                res.send(success("Password Update Successfull",updateData));
            } catch (err) {
                res.send(error("Enter valid Email"));
            }
        } else {
            res.send(error("Enter valid Otp"));
        }



    } catch (err) {
        res.send(errorResponse("Techncal Error for forget password"));
    }
};
    // module.exports=forget_Pass;
