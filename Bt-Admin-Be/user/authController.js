const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const User = require('../dbconfig/schema/userchema');
const Otp = require('../dbconfig/schema/otpSchema')
const { sendOTPEmail, generateOTP } = require('../utils/otpService');
const { verifyEmailUserDb } = require('../utils/commonModule');


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: 'Must Given Email and Password'
            });
        }
        const data = await User.findOne({ email: email });
        if (!data) {
            return res.status(400).json({
                status: false,
                message: 'Invalid email ID'
            });
        }
        const IsPasswordValid = await bcrypt.compare(password, data.password)
        if (IsPasswordValid) {

            const token = jwt.sign(
                { username: data.name, email: data.email, _id: data._id, role: data.role },
                config.secretKey,
                { expiresIn: config.expiresIn }
            );
            return res.status(200).json({
                status: true,
                token: token,
                message: "Login successfully"
            });
        }
        return res.status(400).json({
            status: false,
            message: 'Invalid creds'
        });
    } catch (err) {
        res.status(500).json({ message: 'something went wrong' });
    }
};

const sendOtp = async (req, res) => {
    try {
        const { email, action } = req.body;
        if (!email) {
            return res.status(400).json({
                status: false,
                message: 'email must be given'
            });
        }
        const OTP = generateOTP();

        // sent OTP 
        // const resp = await sendOTPEmail(email, OTP);
        let resp = true
        if (resp) {
            const last_updated_date = new Date();
            const data = await Otp.find({ email });

            if (action==="createUser" && data.length === 0) {
                const payload = new Otp({ email, OTP, last_updated_date });
                await payload.save();
                return res.status(200).json({
                    status: true,
                    message: 'Otp sent for new User successfully',
                    data: email
                });
            }

            if (!action && data.length > 0) {
                await Otp.updateOne({ _id: data[0]._id }, { $set: { OTP, last_updated_date } });
                return res.status(200).json({
                    status: true,
                    message: 'Otp updated successfully',
                    data: email
                });
            } else if (!action && data.length === 0) {
                return res.status(400).json({
                    status: false,
                    message: 'Email is not registered'
                });
            }

            if (action==="createUser" && data.length > 0) {
                return res.status(400).json({
                    status: false,
                    message: 'Email is already registeredd'
                });
            }
            if(action==="remove"){
                await Otp.deleteOne({ email: email });
            }
        }

        return res.status(400).json({
            status: false,
            message: 'Failed to send OTP '
        });
    } catch (err) {
        res.status(500).json({ message: 'something went wrong' });
    }
}

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!otp) {
            return res.status(400).json({
                status: false,
                message: 'Must give OTP'
            });
        }
        const data = await Otp.find({ email: email });
        const lastUpdateOtp = new Date(data[0].last_updated_date);

        if (((new Date()) - lastUpdateOtp) > (10 * 60 * 1000)) {
            //remove Otp 
            await Otp.updateOne({ _id: data[0]._id }, { $unset: { OTP: data[0].OTP } });
            return res.status(400).json({
                status: false,
                message: 'OTP expired'
            });
        };


        if (otp === data[0].OTP) {
            return res.status(200).json({
                status: true,
                message: 'OTP verified successfully'
            });
        } else {
            // OTP is invalid
            return res.status(400).json({
                status: true,
                message: 'Invalid OTP'
            });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to verify OTP' });
    }
}

const updatePassword = async (req, res) => {
    try {
        const { email, updatePassword, OTP } = req.body;
        if (!email, !updatePassword, !OTP) {
            return res.status(400).json({
                status: false,
                message: 'Fill The Required Data'
            });
        }
        const hashedPassword = await bcrypt.hash(updatePassword, 10);


        const isVerifiedOTP = await Otp.find({ email: email });
        if (isVerifiedOTP.length===0) {
            return res.status(400).json({
                status: false,
                message: 'Email is not registered'
            });
        }
        if (OTP !== isVerifiedOTP[0].OTP) {
            return res.status(400).json({
                status: false,
                message: 'You are trying something wrong way'
            });
        }

        const data = await User.findOneAndUpdate(
            { email },
            { $set: { password: hashedPassword } },
            { new: true }
        );
        if (!data) {
            return res.status(404).json({
                status: false,
                message: 'user not found'
            });
        }
        return res.status(200).json({
            status: true,
            message: 'password updated successfully'
        });
    } catch (err) {
        res.status(500).json({ message: 'something went wrong' });
    }
}

module.exports = { login, sendOtp, verifyOtp, updatePassword };
