const express = require('express');
const router = require('./route/route');
const dbConnect = require('./dbconfig/dbconnect');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const _ = require('lodash');


dbConnect();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    if (req.body && req.body.name) {
        req.body.name = _.startCase(_.toLower(req.body.name));
    }
    next();
});

app.use('/api', router);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
