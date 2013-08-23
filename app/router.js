var controller = require('./controllers/controller');

module.exports = function(app) {

    app.get('/', controller.showResumeList);
    app.get('/account/login', controller.login);
    app.post('/account/login', controller.loginHandle);

    app.get('/account/sign_up', controller.signUp);
    app.post('/account/sign_up', controller.signUpHandle);

    app.post('/account/logout', controller.logout);

    app.get('/account/password', controller.changePassword);
    app.post('/account/password', controller.changePasswordHandle);

    app.get('/resumes', controller.showResumeList);
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
}