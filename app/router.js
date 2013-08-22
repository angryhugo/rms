var controller = require('./controllers/controller');

module.exports = function(app) {

    app.get('/', controller.login);
    app.get('/resumes', controller.showResumeList);
    app.get('/login', controller.login);
    app.post('/login', controller.loginHandle);

    app.post('/logout', controller.logout);


    app.get('/resumes/new', controller.showNewResumePage);
    app.post('/resumes/new', controller.addNewResume);

    app.get('/resumes/:id', controller.viewResume);
    app.post('/resumes/:id', controller.editResumeBasic);
    app.delete('/resumes/:id', controller.deleteResume);



    app.post('/resumes/:resume_id/education/new', controller.addEducation);
    app.post('/resumes/:resume_id/education/:id', controller.editEducation);
    app.delete('/resumes/:resume_id/education/:id', controller.deleteEducation);

    app.post('/resumes/:resume_id/projects/new', controller.addProject);
    app.post('/resumes/:resume_id/projects/:id', controller.editProject);
    app.delete('/resumes/:resume_id/projects/:id', controller.deleteProject);



    // app.delete('/skills/:skill_type/:index', controller.deleteSkills);
    // app.post('/skills/:skill_type/:skill_name', controller.addSkills);
    // // app.delete('/skills/delete/:skillType/:index(\\[0-9]*)', controller.deleteSkills);
    // app.get('/resume', controller.resume);
    // // app.get('/deleteEducation', controller.deleteEducation);
}