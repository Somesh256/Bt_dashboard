// routes.js
const express = require('express');
const router = express.Router();

const authMiddleware = require('../utils/authMiddleware');
const { login, sendOtp, verifyOtp, updatePassword } = require('../user/authController');
const { getUserData, createUser, updateUser, deleteUser } = require('../user/profileController');
const { createProjectDetail, getprojectDetails, updateProjectData, deleteProjectData } = require('../user/projectController');


//user
router.get('/user/:id?',authMiddleware, getUserData)

router.post('/user', authMiddleware, createUser);

router.put('/user/:id', authMiddleware, updateUser);

router.delete('/user/:id', authMiddleware, deleteUser);

//auth

router.post('/sendOTP', sendOtp);

router.post('/verifyOTP', verifyOtp);

router.post('/login', login)

router.put('/userupdatepassword', updatePassword)


//project
router.get('/project/:userId?',authMiddleware, getprojectDetails)

router.post('/project',authMiddleware, createProjectDetail);

router.put('/project/:id', authMiddleware, updateProjectData);

router.delete('/project/:id', authMiddleware, deleteProjectData);




module.exports = router;
