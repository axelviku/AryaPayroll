const express = require('express');
// const router = new express.Router();
const Student = require("../models/students");
// const {successResponse, errorResponse } = require("./mesage");
// const bcrypt = require('bcryptjs');
const session = require('express-session');

const userSession = async(req,res)=>{
    var session = req.session;
    session.name = name;
    session.email = email;
    session.mobile = mobile;
}

module.exports=userSession;