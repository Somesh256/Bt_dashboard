const bcrypt = require('bcrypt');
const User = require('../dbconfig/schema/userchema');
const { verifyEmail } = require('../utils/commonModule');
const Otp = require('../dbconfig/schema/otpSchema');

const getUserData = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.query;
        if (id) {
            const data = await User.findById(id);

            return res.status(200).json({
                status: true,
                data: data
            });
        } else if (req.user.role.includes('Admin') && name) {
            const regex = new RegExp(`^${name}`, 'i');
            const data = await User.find({ name: regex });
            return res.status(200).json({
                status: true,
                data: data,
                total: data.length
            });
        } else if (req.user.role.includes('Admin')) {
            const data = await User.find();

            return res.status(200).json({
                status: true,
                data: data,
                total: data.length
            });
        } else {
            const data = await User.find();
            return res.status(200).json({
                status: true,
                total: data.length
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, qualification, role, email, password, mobileNumber, address } = req.body;

        if (!name || !qualification || !Array.isArray(role) || role.length === 0 || !email || !password || !mobileNumber) {
            return res.status(400).json({
                status: false,
                message: 'required fields missing'
            });
        }

        if (!req.user.role.includes('Admin')) {
            return res.status(403).json({
                status: false,
                message: 'User not authorized'
            });
        }
        const checkEmailOtp = await verifyEmail(email)
        if(!checkEmailOtp){
            return res.status(400).json({
                status: false,
                message: 'You are trying something wrong way.'
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const payload = new User({ name, qualification, role, email, password: hashedPassword, mobileNumber, address });
        const data = await payload.save();

        return res.status(201).json({
            status: true,
            data: data
        });

    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(err => err.message);
            return res.status(400).json({
                status: false,
                message: messages.join(', ')
            });
        } else if (err.code === 11000) {
            // Handle duplicate key errors
            return res.status(400).json({
                status: false,
                message: 'Duplicate field value entered'
            });
        }
        res.status(500).json({ message: err.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.user.role.includes('Admin')) {
            return res.status(403).json({
                status: false,
                message: 'User not authorized'
            });
        }

        const deletedUser = await User.findByIdAndDelete(id);
        await Otp.deleteOne({ email: deletedUser.email });
        
        if (!deletedUser) {
            return res.status(404).json({
                status: false,
                message: 'User not found'
            });
        }


        res.status(200).json({
            status: true,
            message: 'User deleted successfully'
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const payload = req.body;

        if (!req.user.role.includes('Admin')) {
            return res.status(403).json({
                status: false,
                message: 'User not authorized'
            });
        }

        if (Object.keys(payload).length === 0) {
            return res.status(400).json({
                status: false,
                message: 'Field Is Empty'
            });
        }

        const excludedFields = ['name', 'email', 'password'];
        excludedFields.forEach(field => delete payload[field]);
        const allowedFields = ['role', 'qualification', 'mobileNumber', 'address'];

        const payloadKeys = Object.keys(payload);
        const isValidUpdate = payloadKeys.every(key => allowedFields.includes(key));

        if (!isValidUpdate) {
            return res.status(400).json({
                status: false,
                message: 'Invalid fields in update payload'
            });
        }

        const data = await User.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
        if (!data) {
            return res.status(404).json({
                status: false,
                message: 'User not found'
            });
        }
        return res.status(200).json({
            status: true,
            data: data
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(err => err.message);
            res.status(400).json({
                status: false,
                message: messages.join(', ')
            });
        } else if (err.code === 11000) {
            // Handle duplicate key errors
            res.status(400).json({
                status: false,
                message: 'Duplicate field value entered'
            });
        }
        
        res.status(500).json({ message: err.message });
    }
};


module.exports = { getUserData, createUser, deleteUser, updateUser };
