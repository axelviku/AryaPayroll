const express = require('express');
const router = new express.Router();
const Student = require("../models/user");
const {success, error } = require("./mesage");

const error_404=async (req,res)=>{
    res.send(error("Page note found"));
}

module.exports=error_404;