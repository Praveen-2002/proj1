function ValidateAddress(address){
    if(!address || !address.line1 || !address.pincode || !address.city || !address.state){
        return false
    }
    const regex = new RegExp(/^[1-9][0-9]{5}$/)
    return regex.test(address.pincode)
}

function ValidateEducation(education){
    if(!education || !education.degree || !education.yearsOfPassing || !education.cgpa){
        return false
    }
    const degreeRegex = new RegExp(/[0-9]/) //check for digits
    if(degreeRegex.test(education.degree) || (education.yearsOfPassing *1 <= 1980 && education.yearsOfPassing *1 > new Date().getFullYear() *1) || education.cgpa*1 > 10){
        return false
    }
    
    return education.degree.toLowerCase() === 'btech' ? education.cgpa *1 >= 5.0 : true
}

function ValidateExperience(experience){
    const compName = new RegExp(/[0-9]/) //check for digits
    const totalExp = 0
    experience.forEach((ele)=>{
        if(!ele.years *1 > 50){
            return false;
        }
        if(ele.years > 0 && !compName.test(ele.company)){
            return false;
        }
        totalExp += ele.years
    })
    return totalExp < 40
}

function validateDocuments(files){
    let filesValidated = {aadhaar: false, photo: false}
    files.forEach((file)=>{
        const type = file.mimetype.split("/")[1]
        if(file.fileName === 'aadhaar' && type === "pdf"){
            filesValidated.aadhaar = true
        }
        if(file.fileName === 'photo' && (type === "png" || type === "jpg")){
            filesValidated.photo = true
        }
    })
    return filesValidated.aadhaar && filesValidated.photo;
}

module.exports = {ValidateAddress, ValidateEducation, ValidateExperience, validateDocuments}
