// const config = require("../config");
const ObjectID = require("mongodb").ObjectId;
// const logger = require("../utils/logger")(module);
const Student = require("../models/user");
const Company = require("../models/user");
const https = require("https");
// const querystring = require("querystring");
// const emailGen = require("../lib/email-template-generator")
//   .emailTemplateGenerator;
// const emailSender = require("../lib/email-sender");
// const auth = require("../lib/auth");
// const commonFunction = require("../commonFunctions");
// const UserGroup = require("../models/user-groups");
// const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
// const Role = require('../models/roles');



// List User Details
module.exports.listUSerDetails = async function(req,res){
    try{
      var userDetails = await Student.findById({_id:ObjectID(req.params.userId)});
      let avatar;
      if(userDetails.profile.imageUrl === `http://${req.headers.host}/assets/images/aryavrat-infotech-squarelogo-1533534321648.png`){
        avatar = userDetails.profile.imageUrl;
      } else {
        avatar = `http://${req.headers.host}/${userDetails.profile.imageUrl.substr(userDetails.profile.imageUrl.indexOf('public')+6)}`
      }
      var returnData = {
        name: `${userDetails.profile.contactInfo.firstName} ${userDetails.profile.contactInfo.lastName}`.trim(),
        gender: (userDetails.profile.contactInfo.gender === undefined)? '' : userDetails.profile.contactInfo.gender,
        phone: (userDetails.profile.contactInfo.phone === undefined)? '' : userDetails.profile.contactInfo.phone,
        birthday: (userDetails.profile.contactInfo.birthday === undefined)? '' : userDetails.profile.contactInfo.birthday,
        avatar: avatar,
        timeZone: userDetails.profile.timeZone,
      }
      return res.send({status:'success', message:'User Details Successfully', data: returnData});
    }catch(err){
      return res.send({status:'error', message: err.message})
    }
  }
  module.exports.availableTimeZone = async function(req,res){
    try {
      var returnData = await Student.availableTimeZone();
      var returnTimeZones = [];
      if(returnData.length > 0){
        returnData.forEach((items)=>{
          var returnTimeZone ={
            "Name": items.timezone_name,
            "Code": items.timezone_name
          }
          returnTimeZones.push(returnTimeZone)
        })
      } else {
        returnTimeZones = [];
      }
      return res.send({status:'success', message:'Time Zone List Successfully', data: returnTimeZones});
    } catch (error) {
      return res.send({status:'error', message:err.message})
    }
  }
  
// update user details
  module.exports.updateUserDetails = async function(req,res){
    try{
        console.log("tryUpdate");
      var updateData = {
        "profile.contactInfo.firstName": commonFunction.getFirstName(req.body.name),
        "profile.contactInfo.lastName": commonFunction.getLastName(req.body.name),
        "profile.contactInfo.phone": req.body.phone,
        "profile.contactInfo.gender": req.body.gender,
        "profile.contactInfo.birthday": req.body.birthday,
        // "profile.timeZone": req.body.timeZone,
      }
      console.log("tryUpdate1");
      if(req.body.birthday.length === 0){
        delete updateData['profile.contactInfo.birthday'];
      }
      console.log("tryUpdate2");
      await User.findOneAndUpdate({_id:ObjectID(req.params.userId)},updateData,{new:true});
      console.log("tryUpdate3");
      return res.send({status:'success', message:'User Profile Updated Successfully'})
    }catch(err){
      return res.send({status:'error', message: err.message});
    }
  }
