const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Job = require('./models/job');
const Application = require('./models/application');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/job_portal', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/search', (req, res) => {
    res.render('search', { jobs: [] });
});

app.post('/search', async (req, res) => {
    const { skill, location } = req.body;
    try {
        const jobs = await Job.find({ skill, location });
        res.render('search', { jobs });
    } catch (err) {
        console.error(err);
        res.send('Error occurred');
    }
});

app.get('/apply/:job_id', (req, res) => {
    res.render('apply', { job_id: req.params.job_id });
});

app.post('/apply/:job_id', async (req, res) => {
    const { job_id } = req.params;
    const { name, email } = req.body;
    const application = new Application({
        job: job_id,
        userName: name,
        userEmail: email,
        status: 'Applied'
    });
    try {
        await application.save();
        res.redirect(`/status?email=${email}`);
    } catch (err) {
        console.error(err);
        res.send('Error occurred');
    }
});

app.get('/status', async (req, res) => {
    const { email } = req.query;
    if (email) {
        try {
            const applications = await Application.find({ userEmail: email });
            res.render('status', { applications });
        } catch (err) {
            console.error(err);
            res.send('Error occurred');
        }
    } else {
        res.render('status', { applications: [] });
    }
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
