const ApplicationModel = require("../mongoose/models/Application.js");
const multer = require("multer");
const fs = require("fs")
const { ValidateAddress, ValidateEducation, ValidateExperience, validateDocuments } = require("../utils/ApplicationHelper.js");

const valideApplicationStatus = ["approved", "rejected", "in_review"]

async function addApplication(req,res){
    const {userId} = req.headers
    const address = JSON.parse(req.body.address)
    const education = JSON.parse(req.body.education)
    const experience = JSON.parse(req.body.experience)
    if(!address || !education || !experience || !(req.files.length > 1)){
        return res.staus(400).json({err:"Please Fill all the details"})
    }
    
    if(!ValidateAddress(address)){
        return res.staus(400).json({err:"Please provide valid address"})
    }

    if(!ValidateEducation(education)){
        return res.staus(400).json({err:"Please provide valid education details"})
    }

    if(!ValidateExperience(experience)){
        return res.status(400).json({err: "Please provide valid Experience details"})
    }

    if(!validateDocuments(req.files)){
        return res.status(400).json({err:"Please Provie all documents and make sure they are in the valid formate"})
    }
    
    let docs = {
        aadhaar: req.files.find(x => x.fileName === 'aadhaar').at(0).destination,
        photo: req.files.find(x => x.fileName === 'photo').at(0).destination
    }
    
    const application = new ApplicationModel({
        userId,
        address,
        education,
        experience,
        documents: docs
    })

    try{
        await application.save()
        return res.staus(200).json({success: true})
    }
    catch(err){
        return res.status(500).json({err: "Server is down!!"})
    }
}

async function updateApplicationStatus(req, res){
    const {id} = req.params
    const { status, adminRemarks } = req.body;
    if(!status || !valideApplicationStatus.find(x => x === status)){
        return res.status(400).json({err: "Please enteer a Valid Applicatoin Status"})
    }
    switch(status){
        case "approved":
            let valid = adminRemarks.length > 9
            return res.status(400).json({err: valid ? "Updated!!": "Remarks should be at least 10 characters" })
        case "rejected":
            return res.status(400).json({ err: adminRemarks != undefined ?  "Updated!!": "Remarks are required"})
    }

    try{
        let findApplication = await ApplicationModel.findById(id)
        if(!findApplication){
            return res.status(400).json({err: "No applicaton was submited by the specific user"})
        }
        if(findApplication.status === "approved"){
            return res.status(400).json({err: "Status can not be updated form Approved"})
        }
        findApplication.status = status
        await findApplication.save()
        return res.status(200).json({success: true})
    }
    catch(err){
        return res.staus(500).json({err: "Serve is down!!"})
    }
}

module.exports = {addApplication, updateApplicationStatus}