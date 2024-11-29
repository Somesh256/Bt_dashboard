const Otp = require("../dbconfig/schema/otpSchema");
const User = require("../dbconfig/schema/userchema");

async function verifyEmail(email) {
    try {
        const verified = await Otp.findOne({ email }) ? true : false;
        if(verified){
            return true
        }else{
            return false
        }

    } catch (error) {
        throw new Error('something went wrong');
    }
}

async function verifyEmailUserDb(email) {
    try {
        const verified = await User.findOne({ email }) ? true : false;
        if(verified){
            return true
        }else{
            return false
        }

    } catch (error) {
        throw new Error('something went wrong');
    }
}

module.exports = { verifyEmail, verifyEmailUserDb };
