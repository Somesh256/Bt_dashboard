const User = require('../dbconfig/schema/userchema');
const Project = require('../dbconfig/schema/projectSchema');

const createProjectDetail = async (req, res) => {
    try {
        const { name, country, userId, domain, startDate, loginTime, logoutTime } = req.body;

        if (!name || !country || !userId || !domain || !startDate || !loginTime || !logoutTime) {
            return res.status(400).json({
                status: false,
                message: 'Required Fields are missing '
            });
        }

        if (!req.user.role.includes('Admin')) {
            return res.status(403).json({
                status: false,
                message: 'User not authorized'
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                status: false,
                error: 'User not found'
            });
        }
        const project = new Project({ name, country, userId, domain, startDate, loginTime, logoutTime });
        const data = await project.save();
        if (data) {
            return res.status(201).json({
                status: true,
                data: data
            });
        }

    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.keys(err.errors).map(key => ({
                field: key,
                message: err.errors[key].message,
                status: 'validation_error'
            }));
            return res.status(400).json({
                status: false,
                Err: errors
            });
        } else if (err.code === 11000) {
            // Handle duplicate key errors
           return  res.status(400).json({
                status: false,
                message: 'Duplicate field value entered'
            });
        }
        res.status(500).json({ message: err.message });
    }
};

const getprojectDetails = async (req, res) => {
    try {
        const { userId } = req.params;
        if (userId) {
            const data = await Project.find({ userId: userId });
            return res.status(200).json({
                status: true,
                data: data,
                total: data.length
            });
        } else {
            const data = await Project.find();
            return res.status(200).json({
                status: true,
                data: data,
                total: data.length
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateProjectData = async (req, res) => {
    try {

        const { id } = req.params;
        const payload = req.body.userId;

        if (!req.user.role.includes('Admin')) {
            return res.status(403).json({
                status: false,
                message: 'User not authorized'
            });
        }

        if (!payload) {
            return res.status(400).json({
                status: false,
                message: 'Select user For assign project'
            });
        }

        const data = await Project.findByIdAndUpdate(id, { userId: payload }, { new: true, runValidators: true });
        if (!data) {
            return res.status(404).json({
                status: false,
                message: 'Project not found'
            });
        }
        return res.status(200).json({
            status: true,
            data: data
        });


    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteProjectData = async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.user.role.includes('Admin')) {
            return res.status(403).json({
                status: false,
                message: 'User not authorized'
            });
        }
        const deletedUser = await Project.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({
                status: false,
                message: 'project not found'
            });
        }
        return res.json({
            status: true,
            message: 'Project deleted successfully'
        });

    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}



module.exports = { createProjectDetail, getprojectDetails, updateProjectData, deleteProjectData };
