var controller = require('./controllers/controller');

module.exports = function(app) {

    app.get('/', loginCheck, controller.showResumeList);
    app.get('/login', controller.login);
    app.post('/login', controller.loginHandle);

    app.get('/sign_up', controller.signUp);
    app.post('/sign_up', controller.signUpHandle);

    app.get('/logout', loginCheck, controller.logout);

    app.get('/password', loginCheck, controller.changePassword);
    app.post('/password', loginCheck, controller.changePasswordHandle);

    app.get('/resumes', loginCheck, controller.showResumeList);
    app.get('/resumes/new', loginCheck, controller.showNewResumePage);
    app.post('/resumes/new', loginCheck, controller.addNewResume);

    app.get('/resumes/:id', loginCheck, controller.viewResume);
    app.post('/resumes/:id', loginCheck, controller.editResumeBasic);
    app.delete('/resumes/:id', loginCheck, controller.deleteResume);

    app.post('/resumes/:resume_id/education/new', loginCheck, controller.addEducation);
    app.post('/resumes/:resume_id/education/:id', loginCheck, controller.editEducation);
    app.delete('/resumes/:resume_id/education/:id', loginCheck, controller.deleteEducation);

    app.post('/resumes/:resume_id/projects/new', loginCheck, controller.addProject);
    app.post('/resumes/:resume_id/projects/:id', loginCheck, controller.editProject);
    app.delete('/resumes/:resume_id/projects/:id', loginCheck, controller.deleteProject);
};

function loginCheck(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    res.redirect('/login');
};