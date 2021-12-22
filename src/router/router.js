const express = require('express');
const router = new express.Router();
const Student = require("../models/user");

// import controller path
const register = require("../controller/user_register");
const login = require("../controller/login");
const setPass = require("../controller/setPassword");
const companyController = require('../controller/company-controller');

const {send_otp,forgetPass} = require("../controller/forgetPass");
const error_404 = require('../controller/404');



//router path
router.get("/register",async(req,res)=>{
    const std = await Student.find();
    res.send(std);
});
router.post("/user/signup-via-email",register);
router.post("/user/confirm-registration",setPass);
router.post("/users/login",login);
router.post("/company/add-company/:parentUserId",companyController.addCompany);
// router.get('/company/company-list/:parentUserId',companyController.listAllCompanies);
router.post("/forgetPass",forgetPass);
router.post("/*",error_404);



module.exports= router;


