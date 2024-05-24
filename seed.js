const mongoose = require('mongoose');
const Job = require('./models/job');

mongoose.connect('mongodb://localhost:27017/job_portal', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const jobs = [
    { title: 'Software Engineer', skill: 'JavaScript', location: 'Bangalore' },
    { title: 'Data Scientist', skill: 'Python', location: 'Mumbai' },
    { title: 'Backend Developer', skill: 'Node.js', location: 'Hyderabad' },
    { title: 'Frontend Developer', skill: 'React', location: 'Pune' },
    { title: 'Full Stack Developer', skill: 'JavaScript', location: 'Chennai' },
    { title: 'Machine Learning Engineer', skill: 'Python', location: 'Delhi' },
    { title: 'DevOps Engineer', skill: 'AWS', location: 'Kolkata' },
    { title: 'Mobile App Developer', skill: 'Flutter', location: 'Ahmedabad' },
    { title: 'UI/UX Designer', skill: 'Sketch', location: 'Gurgaon' },
    { title: 'Cyber Security Analyst', skill: 'Cyber Security', location: 'Noida' }
];


Job.insertMany(jobs)
    .then(() => {
        console.log('Data inserted');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error inserting data:', err);
    });
