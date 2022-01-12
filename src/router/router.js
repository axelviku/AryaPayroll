const express = require('express');
const router = new express.Router();
const Student = require("../models/user");

// import controller path
const register = require("../controller/user_register");
const login = require("../controller/login");
const setPass = require("../controller/setPassword");
const companyController = require('../controller/company-controller');
const userController = require('../controller/user-controller');

const {send_otp,forgetPass} = require("../controller/forgetPass");
const error_404 = require('../controller/404');



//router path
router.get("/register",async(req,res)=>{
    const std = await Student.find();
    res.send(std);
});
//registration api
router.post("/user/signup-via-email",register);
router.post("/user/confirm-registration",setPass);
// login api
router.post("/users/login",login);
// company add
router.post("/company/add-company/:parentUserId",companyController.addCompany);
// company
router.get('/company/company-list/:parentUserId',companyController.listAllCompanies);
router.get('/company/details/:companyId',companyController.companyDetails);
//user Details
router.get('/user-details/:userId',userController.listUSerDetails);
router.post('/user/update-details/:userId',userController.updateUserDetails);
/** Time Zone */
router.get('/availabe-timezone',userController.availableTimeZone);
router.post("/forgetPass",forgetPass);
router.post("/*",error_404);
// router.post('/company/upload-logo/:companyId/:type/:isCompanyLogo',companyController.uploadCompanyLogo);




module.exports= router;


