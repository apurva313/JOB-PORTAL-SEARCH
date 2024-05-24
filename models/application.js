const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    status: { type: String, required: true }
});

module.exports = mongoose.model('Application', applicationSchema);
