var controller = require('./controllers/controller');

module.exports = function(app) {

    app.get('/', controller.loginCheck, controller.showResumeList);
    app.get('/login', controller.login);
    app.post('/login', controller.loginHandle);

    app.get('/sign_up', controller.signUp);
    app.post('/sign_up', controller.signUpHandle);

    app.get('/logout', controller.loginCheck, controller.logout);

    app.get('/password', controller.loginCheck, controller.changePassword);
    app.post('/password', controller.loginCheck, controller.changePasswordHandle);

    app.get('/resumes', controller.loginCheck, controller.showResumeList);
    app.get('/resumes/new', controller.loginCheck, controller.showNewResumePage);
    app.post('/resumes/new', controller.loginCheck, controller.addNewResume);

    app.get('/resumes/:id', controller.loginCheck, controller.viewResume);
    app.post('/resumes/:id', controller.loginCheck, controller.editResumeBasic);
    app.delete('/resumes/:id', controller.loginCheck, controller.deleteResume);

    app.post('/resumes/:resume_id/education/new', controller.loginCheck, controller.addEducation);
    app.post('/resumes/:resume_id/education/:id', controller.loginCheck, controller.editEducation);
    app.delete('/resumes/:resume_id/education/:id', controller.loginCheck, controller.deleteEducation);

    app.post('/resumes/:resume_id/projects/new', controller.loginCheck, controller.addProject);
    app.post('/resumes/:resume_id/projects/:id', controller.loginCheck, controller.editProject);
    app.delete('/resumes/:resume_id/projects/:id', controller.loginCheck, controller.deleteProject);
};