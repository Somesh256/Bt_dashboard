const mongoose = require('mongoose');
const { validateMobileNumber, validateEmail } = require('../../utils/validation');

const rolesEnum = ['Admin', 'Developer', 'DevOps', 'Manager','CTO','CEO','BA','HR'];

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    role: [
        {
            type: String,
            enum: rolesEnum
        }
    ],
    email: {
        type: String,
        required: true,
        validate: {
            validator: validateEmail,
            message: props => `${props.value} is not a valid email address`
        },
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true,
        validate: {
            validator: validateMobileNumber,
            message: props => `${props.value} is not a valid mobile number`
        },
        unique: true
    },
    address: {
        type: String,
        required: false
    },
    last_updated_date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
