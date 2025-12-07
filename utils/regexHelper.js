function ValidatewithRegex(input, type){
    let regex;
    switch(type){
        case 'name':
            regex = new RegExp(/[a-zA-z\s]/)
            return regex.test(input)

        case 'email':
            regex = new RegExp(/^[a-zA-Z0-9_\-.]+@[a-zA-Z]+\.[a-z]{2,}$/)
            return regex.test(input)
        
        case 'password':
            regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[.\-_$#!^@]).{8,}$/)
            return regex.test(input)

        case 'phone':
            regex = new RegExp(/^[6-9]{1}[0-9]{9}$/)
            return regex.test(input)
    }   
}

module.exports = {ValidatewithRegex}