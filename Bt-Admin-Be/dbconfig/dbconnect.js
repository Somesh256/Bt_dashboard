// mongoConnect.js
const mongoose = require('mongoose');

const dbConnect = async () => {

    await mongoose.connect('mongodb://localhost:27017/bt', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
};

module.exports = dbConnect;
