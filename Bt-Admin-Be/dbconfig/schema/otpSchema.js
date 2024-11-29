const mongoose = require('mongoose');
const { validateEmail  } = require('../../utils/validation');


const userOtpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: validateEmail,
            message: props => `${props.value} is not a valid email address`
        }
    },
    OTP: {
        type: String,
        required: true
    },
    last_updated_date: {
        type: Date,
        default: Date.now
    }
});

const Otp = mongoose.model('userotp', userOtpSchema);

module.exports = Otp;
