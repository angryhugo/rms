var fs = require('fs');
var path = require('path');
var dbHelper = require('../models/dbHelper');

module.exports = {
    login: function(req, res) {
        res.render('login');
    },

    signUp: function(req, res) {
        res.render('sign-up');
    },

    loginHandle: function(req, res) {
        var email = req.body.email || "";
        var password = req.body.password || "";
        dbHelper.login(email, password, function(err, user) {
            if (err) {
                console.log(err);
                res.send('Server error!');
            } else {
                if (user) {
                    req.session.userId = user.id;
                    req.session.userEmail = user.email;
                    res.redirect('/resumes');
                } else {
                    res.redirect('/account/login');
                }
            }
        });
    },

    signUpHandle: function(req, res) {
        var email = req.body.email || "";
        var password = req.body.password1 || "";
        var name = req.body.name || "";
        dbHelper.signUp(email, password, name, function(err, userId) {
            if (err) {
                console.log(err);
                //email唯一，导致错误
                res.redirect('/account/sign_up');
            } else {
                if (userId) {
                    req.session.userId = userId;
                    res.redirect('/resumes');
                } else {
                    res.redirect('/account/sign_up');
                }
            }
        });
    },

    // &.ajax
    // loginHandle: function(req, res) {
    //     var email = req.body.email || "";
    //     var password = req.body.password || "";
    //     var existFlag = false;
    //     dbHelper.login(email, password, function(err, userId) {
    //         if (err) {
    //             console.log(err);
    //             res.send('Server error!');
    //         } else {
    //             if (userId) {
    //                 req.session.userId = userId;
    //                 existFlag = true;
    //                 res.send(existFlag);
    //             } else {
    //                 res.send(existFlag);
    //             }
    //         }
    //     });
    // },

    logout: function(req, res) {
        req.session.userId = 0;
        req.session.userEmail = "";
        res.send('logout successfully!');
        //res.redirect('/login');//使用ajax后这条语句不会执行
    },

    changePassword: function(req, res) {
        if (req.session.userId) {
            res.render('password', {
                email: req.session.userEmail
            });
        } else {
            res.redirect('/account/login');
        }
    },

    changePasswordHandle: function(req, res) {
        var oldPassword = req.body.old_password || "";
        var newPassword = req.body.password1 || "";
        dbHelper.changePassword(req.session.userId, oldPassword, newPassword, function(err, oldPasswordRight) {
            if (err) {
                console.log(err);
                res.send('Server error!');
            } else {
                if (oldPasswordRight) {
                    res.redirect('/resumes');
                } else {
                    //旧密码不正确
                    res.redirect('/account/password');
                }
            }
        });
    },

    showNewResumePage: function(req, res) {
        if (req.session.userId) {
            res.render('new-resume', {
                userId: req.session.userId
            });
        } else {
            res.redirect('/account/login');
        }
    },

    addNewResume: function(req, res) {
        var userId = req.session.userId; //获取登录后的userId
        var newResume = getNewResume(req, res);
        dbHelper.addNewResume(userId, newResume, function(err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/resumes');
            }
        });
    },

    showResumeList: function(req, res) {
        if (req.session.userId) {
            dbHelper.showResumeList(req.session.userId, function(err, user, resumeList, existFlag) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('resume-list', {
                        resumeList: resumeList,
                        user: user
                    });
                }
            });
        } else {
            res.redirect('/account/login');
        }
    },

    viewResume: function(req, res) {
        if (req.session.userId) {
            var userId = req.session.userId;
            var resumeId = req.params.id || "";
            dbHelper.showResumeInfo(userId, resumeId, function(err, allInfo, existFlag) {
                if (err) {
                    console.log(err);
                    res.send('Server error!');
                } else {
                    if (existFlag) {
                        res.render('show-resume', {
                            title: allInfo.title,
                            user: allInfo.user,
                            resume: allInfo.resume,
                            projectList: allInfo.projects,
                            educationList: allInfo.educations
                        });
                    } else {
                        res.redirect('/resumes');
                    }
                }
            });
        } else {
            res.redirect('/account/login');
        }
    },

    deleteResume: function(req, res) {
        var resumeId = req.params.id || "";
        dbHelper.deleteResume(resumeId, function(err) {
            if (err) {
                console.log(err);
                res.send('Server error!');
            } else {
                res.send('Delete successfully!');
            }
        });
    },

    editResumeBasic: function(req, res) {
        var resumeId = req.params.id || "";
        var newResume = {
            name: req.body.resume_name || "",
            age: req.body.age || "",
            email: req.body.email || "",
            gender: req.body.genderRadios || "",
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
};

function getNewResume(req, res) {
    var resume_name = req.body.resume_name || "";
    var email = req.body.email || "";
    var age = req.body.age || "";
    var gender = req.body.genderRadios || "";
    var address = req.body.address || "";

    var newResumeBasic = {
        name: resume_name,
        email: email,
        age: age,
        gender: gender,
        address: address
    };

    var company = req.body.company || "";
    var companyPeriodFrom = req.body.company_period_from || "";
    var companyPeriodTo = req.body.company_period_to || "";
    var description = req.body.company_description || "";
    var newProject = {
        company: company,
        range: companyPeriodFrom + "-" + companyPeriodTo,
        description: description,
    };

    var university = req.body.university || "";
    var universityPeriodFrom = req.body.university_period_from || "";
    var universityPeriodTo = req.body.university_period_to || "";
    var major = req.body.university_major || "";
    var newEducation = {
        school: university,
        range: universityPeriodFrom + "-" + universityPeriodTo,
        major: major,
    };

    var newResume = {
        basicInfo: newResumeBasic,
        project: newProject,
        education: newEducation
    };
    return newResume;
}