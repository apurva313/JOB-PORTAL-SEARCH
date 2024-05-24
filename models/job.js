const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    skill: { type: String, required: true },
    location: { type: String, required: true }
});

module.exports = mongoose.model('Job', jobSchema);
