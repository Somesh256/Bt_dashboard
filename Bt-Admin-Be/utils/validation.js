//mobile number validation
const validateMobileNumber = function (mobileNumber) {
    const mobileNumberRegex = /^[0-9]{10}$/;
    return mobileNumberRegex.test(mobileNumber);
};

// email validation

const validateEmail = function (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};


module.exports =  {
    validateMobileNumber,
    validateEmail
};
