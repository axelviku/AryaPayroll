
const Company = require("../models/company");
const ObjectID = require("mongodb").ObjectID;
const { success, error } = require("./mesage");
const MetaData = require("../models/meta-data");
// const commonFunction = require("../commonFunctions");
// const Holiday = require("../models/holiday");
// const Leave = require("../models/leave");
const User = require("../models/user");
// const JobProfile = require("../models/job-profile");
// const Department = require("../models/department");
// const _ = require("underscore");
// const moment = require("moment");
// const LeaveType = require("../models/leaves-type");
// const Branch = require("../models/branch");
// const DocumentTypes = require("../models/document-types");
// const GradeRule = require("../models/grade-rule");
// const JobCategory = require("../models/job-category");
// const PaymentHead = require("../models/payment-head");
// const SkillCategory = require("../models/skill-category");
const mongoose = require("mongoose");
// const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

// Add company
module.exports.addCompany = async function (req, res) {
    if (
        !req.body.name ||
        !req.body.address ||
        !req.body.email ||
        !req.body.officialNumber
    ) {
        return res.send(error("Missing required fields"));
    }
    try {
        var companyData = {};
        companyData = req.body;
        console.log(companyData);
        // companyData.parentUserId = req.params.parentUserId;
        // console.log("fghjdf");
        // req.params.subUserId ? (companyData.subUserId = req.params.subUserId) : "";
        // console.log("fdgjk");
        const newCompany = await Company.addCompany(companyData);
        // const newCompany = await newsCompany.save();
        console.log("bye");
        if (newCompany) {
            console.log("helluyhkgjybgyo");
            const returnCompanyData = {
                _id: newCompany.company._id,
                createdAt: newCompany.company.createdAt
            };
            return res.send(success("Company added Successfully...", returnCompanyData));
            console.log("Added Success");
        } else {
            return res.send(error("Unable to add Company"));
        }
    } catch (err) {
        console.log("hello");
        console.log("This is a boy", err.message);
        return res.send(error("try part"));
    }
};


// List all the companies under both parent user as well as subuser
// module.exports.listAllCompanies = async function (req, res) {
//     try {
//         let userDetails = await User.findById({ _id: ObjectID(req.params.parentUserId) });
//         if (userDetails.parentUserId) {
//             var companyList = await Company.find({ userId: userDetails.parentUserId });
//         } else {
//             var companyList = await Company.find({ userId: req.params.parentUserId });
//         }

//         res.send({
//             status: "success",
//             message: "Company List Success",
//             company: companyList
//         });
//     } catch (err) {
//         res.send({ status: "error", message: err.message });
//     }
// };
