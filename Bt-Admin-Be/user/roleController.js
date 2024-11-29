// const Role = require('../dbconfig/schema/roleSchema')
// const createRoles = async (req, res) => {
//     try {
//         const { name, description } = req.body;

//         if (req.user.role !== 'Admin') {
//             return res.status(403).json({ message: 'User not authorized' });
//         }

//         if (!name || !description) {
//             return res.status(400).json({ error: 'Required Fields are missing ' });
//         }
//         const role = new Role({ name, description });
//         const data = await role.save();
//         return res.status(201).json({
//             status: 'Create  successfully',
//             data: data
//         });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// const getRoles = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         if (userId) {
//             const data = await Role.find({ userId: userId });
//             return res.status(200).json({
//                 status: 'success',
//                 data: data
//             });
//         }
//         const data = await Role.find();
//         return res.status(200).json({
//             status: 'success',
//             data: data
//         });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// const updateRolesData = async (req, res) => {
//     try {

//         const { id } = req.params;
//         const payload = req.body;

//         if (req.user.role !== 'Admin') {
//             return res.status(403).json({ message: 'User not authorized' });
//         }

//         if (!id) {
//             return res.status(400).json({ message: 'role ID is required' });
//         }
//         const allowedFields = ['name','description'];

//         const payloadKeys = Object.keys(payload);
//         const isValidUpdate = payloadKeys.every(key => allowedFields.includes(key));

//         if (!isValidUpdate) {
//             return res.status(400).json({ message: 'Invalid fields in update payload' });
//         }

//         const data = await Project.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
//         if (!data) {
//             return res.status(404).json({ message: 'role not found' });
//         }
//         return res.status(200).json({
//             status: 'success',
//             data: data
//         });


//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// const deleteRole = async (req, res) => {
//     try {
//         const { id } = req.params;
//         if (req.user.role !== 'Admin') {
//             return res.status(403).json({ message: 'User not authorized' });
//         }
//         if (id) {
//             const deletedUser = await Project.findByIdAndDelete(id);
//             if (!deletedUser) {
//                 return res.status(404).json({ message: 'role not found' });
//             }
//             return res.json({ message: 'role deleted successfully' });
//         }
//         return res.status(400).json({ message: 'role ID is required' });

//     }
//     catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }



// module.exports = { createRoles, getRoles, updateRolesData, deleteRole };
