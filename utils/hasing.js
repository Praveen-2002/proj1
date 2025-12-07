const bcrypt = require('bcrypt')
const helper = require('./Secrets.js')

function hashInput(input){
    return bcrypt.hashSync(input, helper.bcryptSalt)
}

function compareHashedInput(input, hashedInput){
    return bcrypt.compareSync(input, hashedInput)
}

module.exports = {hashInput, compareHashedInput}