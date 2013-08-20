var controller = require('./controllers/controller');

module.exports = function(app) {

    app.get('/', controller.index);
    app.get('/login', controller.login);

    app.get('/resumes/:id', controller.viewResume);

    app.post('/resumes/:id', controller.editResumeBasic);
    app.post('/resumes/:resume_id/education/new', controller.addEducation);
    app.post('/resumes/:resume_id/education/:id', controller.editEducation);
    app.delete('/resumes/:resume_id/education/:id', controller.deleteEducation);



    // app.delete('/skills/:skill_type/:index', controller.deleteSkills);
    // app.post('/skills/:skill_type/:skill_name', controller.addSkills);
    // // app.delete('/skills/delete/:skillType/:index(\\[0-9]*)', controller.deleteSkills);
    // app.get('/resume', controller.resume);
    // // app.get('/deleteEducation', controller.deleteEducation);
}