// models/Project.js
const mongoose = require('mongoose');
const moment = require('moment');

const timeValidator = {
    validator: function (v) {
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
    },
    message: props => `${props.value} is not a valid time format!`
};

const startDateValidator = {
    validator: function (v) {
      const date = moment(v, 'DD/MM/YYYY', true);
      return date.isValid() && !date.isAfter(moment());
    },
    message: props => `${props.value} is not a valid date or it is a future date!`
  };

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    domain: { type: String, required: true, enum: ['Node.js','Java','Azure','Aws','Kubernetes','Grafana','.NET','Full stack','Angular'] },
    startDate: { type: Date, required: true, validate: startDateValidator }, 
    loginTime: { type: String, required: true, validate: timeValidator },
    logoutTime: { type: String, required: true, validate: timeValidator } 
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
