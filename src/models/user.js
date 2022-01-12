const mongoose = require('mongoose');
const objectIdValidator = require('mongoose').Types.ObjectId;
const ObjectID = require('mongodb').ObjectID;
const validator = require('validator');
const jwt = require("jsonwebtoken");
const cookieParsar = require("cookie-parser");
const session = require('express-session');
const Token = require('./token');
const MetaData = require('../models/meta-data');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


const studentSchema = new mongoose.Schema({
    parentUserId: ObjectId,
    registrationToken: Token.schema,
    metaData: MetaData.schema,
    isActive: {
        type: Boolean,
        default: true
      },
      lastLogin : Date,
    email: {
        type: String,
        // required: true,
        unique: true,
        // sparse:true,
        // lowercase:true,
        // time:true,
        // validate(value) {
        //     if (!validator.isEmail(value)) {
        //         return new Error("Enter Valid Email");
        //     }
        // },
        // match: /^([a-zA-Z0-9])(([a-zA-Z0-9])*([\._\+-])*([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/,
    },
    mobile:{
        type:Number,
        // minlength:[10,"Minimum length is 10 digit"],
        // maxlength:[10,"Maximum length is 10 digit"],
        // trim:true,
        // unique:true,
        // required: true
        // match: /^[6-9]\d{9}$/,
    },
    password:{
         type: String,
        // required:true,
        
        // match: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,60}$/
    },
//     tokens:[{
//         token:{
//             type:String,
//             required:true
//         }
//  }],
    date:{
        type: Date,
        default: Date.now
    }
});

// studentSchema.methods.generateAuthToken = async function(){
//     try{
//        const token = jwt.sign({_id:this._id.toString()}, "mynameisvikrant");
//        this.tokens = this.tokens.concat({token:token});
//         await this.save();
//        return token;
//        var session = req.session;
//        session.token = token;
//     }catch(error){
//         res.send("the error "+ error);
//     }
// };
studentSchema.pre("save", async function(next){
    this.registrationToken = new Token();      
    next();
});
const Student = new mongoose.model('Student',studentSchema);

module.exports = Student;
