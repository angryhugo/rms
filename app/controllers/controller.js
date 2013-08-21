var fs = require('fs');
var path = require('path');
var dbHelper = require('../models/dbHelper');

module.exports = {
    index: function(req, res) {
        dbHelper.showResumeInfo(1, function(err, allInfo) {
            if (err) {
                console.log(err);
                res.send('Server error!');
            } else {
                res.render('index1', {
                    title: allInfo.title,
                    resume: allInfo.resume,
                    projectList: allInfo.projects,
                    educationList: allInfo.educations
                });
            }
        });
    },

    login: function(req, res) {
        res.render('login');
    },

    showResumeList: function(req, res) {
        var userId = 1; ///////获取登录后的userId
        dbHelper.showResumeList(userId, function(err, user, resumeList, existFlag) {
            if (err) {
                console.log(err);
            } else {
                res.render('resume-list', {
                    resumeList: resumeList,
                    user: user
                });
            }
        });
    },

    viewResume: function(req, res) {
        var resumeId = req.params.id || "";
        dbHelper.showResumeInfo(resumeId, function(err, allInfo, existFlag) {
            if (err) {
                console.log(err);
                res.send('Server error!');
            } else {
                if (existFlag) {
                    res.render('show-resume', {
                        title: allInfo.title,
                        resume: allInfo.resume,
                        projectList: allInfo.projects,
                        educationList: allInfo.educations
                    });
                } else {
                    res.send('Resume do not exist!');
                }
            }
        });
    },

    editResumeBasic: function(req, res) {
        var resumeId = req.params.id || "";
        var newResume = {
            name: req.body.resume_name || "",
            age: req.body.age || "",
            email: req.body.email || "",
            gender: req.body.gender || "",
            address: req.body.address || ""
        };
        dbHelper.editResumeBasic(resumeId, newResume, function(err) {
            if (err) {
                console.log(err);
                res.send('Server error!');
            } else {
                res.redirect('/resumes/' + resumeId);
            }
        });
    },

    editEducation: function(req, res) {
        var newEducation = getNewEducation(req, res);
        var resumeId = req.params.resume_id || "";
        var educationId = req.params.id || "";
        dbHelper.editEducation(educationId, newEducation, function(err) {
            if (err) {
                console.log(err);
                res.send('Server error!');
            } else {
                res.redirect('/resumes/' + resumeId);
            }
        })
    },

    addEducation: function(req, res) {
        var newEducation = getNewEducation(req, res);
        var resumeId = req.params.resume_id || "";
        dbHelper.addEducation(resumeId, newEducation, function(err) {
            if (err) {
                console.log(err);
                res.send('Server error!');
            } else {
                res.redirect('/resumes/' + resumeId);
            }
        })
    },

    deleteEducation: function(req, res) {
        var id = req.params.id || '';
        var resumeId = req.params.resume_id || "";
        dbHelper.deleteEducation(id, function(err) {
            if (err) {
                console.log(err);
                res.send('Server error!');
            } else {
                res.send('Delete successfully!');
            }
        });
    },


    editProject: function(req, res) {
        var newProject = getNewProject(req, res);
        var resumeId = req.params.resume_id || "";
        var projectId = req.params.id || "";
        dbHelper.editProject(projectId, newProject, function(err) {
            if (err) {
                console.log(err);
                res.send('Server error!');
            } else {
                res.redirect('/resumes/' + resumeId);
            }
        })
    },

    addProject: function(req, res) {
        var newProject = getNewProject(req, res);
        var resumeId = req.params.resume_id || "";
        dbHelper.addProject(resumeId, newProject, function(err) {
            if (err) {
                console.log(err);
                res.send('Server error!');
            } else {
                res.redirect('/resumes/' + resumeId);
            }
        })
    },

    deleteProject: function(req, res) {
        var id = req.params.id || '';
        var resumeId = req.params.resume_id || "";
        dbHelper.deleteProject(id, function(err) {
            if (err) {
                console.log(err);
                res.send('Server error!');
            } else {
                res.send('Delete successfully!');
            }
        });
    },
};

function getNewEducation(req, res) {
    var university = req.body.edit_university || "";
    var periodFrom = req.body.edit_university_period_from || "";
    var periodTo = req.body.edit_university_period_to || "";
    var major = req.body.edit_university_major || "";
    var newEducation = {
        school: university,
        range: periodFrom + "-" + periodTo,
        major: major,
    };
    return newEducation;
};

function getNewProject(req, res) {
    var company = req.body.edit_company || "";
    var periodFrom = req.body.edit_company_period_from || "";
    var periodTo = req.body.edit_company_period_to || "";
    var description = req.body.edit_company_description || "";
    var newProject = {
        company: company,
        range: periodFrom + "-" + periodTo,
        description: description,
    };
    return newProject;
}