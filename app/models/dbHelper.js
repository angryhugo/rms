var entityFactory = require('./entityFactory');
var passwordHash = require('password-hash');

var sequelize = entityFactory.sequelize;
var User = entityFactory.User;
var Resume = entityFactory.Resume;
var Education = entityFactory.Education;
var Project = entityFactory.Project;

exports.login = function(email, password, callback) {
	User.find({
		where: {
			email: email,
		}
	}).success(function(user) {
		if (user) {
			if (passwordHash.verify(password, user.password)) {
				callback(null, user);
			} else {
				callback(null, 0);
			}
		} else {
			callback(null, 0);
		}
	}).error(function(err) {
		callback(err);
	});
};

exports.signUp = function(email, password, name, callback) {
	var hashedPassword = passwordHash.generate(password);
	User.create({
		name: name,
		email: email,
		password: hashedPassword
	}).success(function(user) {
		callback(null, user.id);
	}).error(function(err) {
		callback(err);
	});
},

exports.changePassword = function(userId, oldPassword, newPassword, callback) {
	User.find(userId).success(function(user) {
		if (passwordHash.verify(oldPassword, user.password)) {
			user.password = passwordHash.generate(newPassword);
			user.save().success(function(user) {
				callback(null, true);
			}).error(function(err) {
				callback(err);
			});
		} else {
			callback(null, false);
		}
	}).error(function(err) {
		callback(err);
	});
},

exports.showResumeList = function(userId, callback) {
	User.find(userId).success(function(user) {
		Resume.findAll({
			where: {
				user_id: user.id
			}
		}).success(function(resumes) {
			callback(null, user, resumes, true);
		}).error(function(err) {
			callback(err);
		});
	}).error(function(err) {
		callback(err);
	});
};

exports.showResumeInfo = function(userId, resumeId, callback) {
	var allInfo = {};
	User.find(userId).success(function(user) {
		Resume.find(resumeId).success(function(resume) {
			if (!resume || resume.user_id != userId) { //简历不存在或者简历不是该用户的
				callback(null, allInfo, false);
			} else {
				Education.findAll({
					where: ['resume_id = ?', resume.id]
				}).success(function(educations) {
					Project.findAll({
						where: {
							resume_id: resume.id
						}
					}).success(function(projects) {
						allInfo.user = user;
						allInfo.resume = resume;
						allInfo.projects = projects;
						allInfo.educations = educations;
						callback(null, allInfo, true);
					}).error(function(err) {
						callback(err);
					});
				}).error(function(err) {
					callback(err);
				});
			}
		}).error(function(err) {
			callback(err);
		});
	}).error(function(err) {
		callback(err);
	});
};

exports.editResumeBasic = function(id, newResume, callback) {
	// Resume.find(id).success(function(resume) {
	// 	resume.name = newResume.name;
	// 	resume.age = newResume.age;
	// 	resume.gender = newResume.gender;
	// 	resume.email = newResume.email;
	// 	resume.address = newResume.address;
	// 	resume.save().success(function(resume) {
	// 		callback(null);
	// 	}).error(function(err) {
	// 		callback(err);
	// 	});
	// }).error(function(err) {
	// 	callback(err);
	// });
	Resume.update({
		name: newResume.name,
		age: newResume.age,
		gender: newResume.gender,
		email: newResume.email,
		address: newResume.address
	}, {
		id: id
	}).success(function(resume) {
		callback(null);
	}).error(function(err) {
		callback(err);
	});
};

exports.deleteResume = function(resumeId, callback) {
	Resume.destroy({
		id: resumeId
	}).success(function() {
		Education.destroy({
			resume_id: resumeId
		}).success(function() {
			Project.destroy({
				resume_id: resumeId
			}).success(function() {
				callback(null);
			}).error(function(err) {
				callback(err);
			});
		}).error(function(err) {
			callback(err);
		});
	}).error(function(err) {
		callback(err);
	});
};

exports.editEducation = function(id, newEducation, callback) {
	Education.update({
		school: newEducation.school,
		range: newEducation.range,
		major: newEducation.major
	}, {
		id: id
	}).success(function(education) {
		callback(null);
	}).error(function(err) {
		callback(err);
	});
};

exports.addEducation = function(resumeId, newEducation, callback) {
	Education.create({
		range: newEducation.range,
		school: newEducation.school,
		major: newEducation.major,
		resume_id: resumeId
	}).success(function(education) {
		callback(null);
	}).error(function(err) {
		callback(err);
	});
};

exports.deleteEducation = function(education_id, callback) {
	// Education.find(education_id).success(function(education) {
	// 	education.destroy().success(function(edu) {
	// 		callback(null);
	// 	}).error(function(err) {
	// 		callback(err);
	// 	});
	// }).error(function(err) {
	// 	callback(err);
	// });
	Education.destroy({
		id: education_id
	}).success(function(edu) {
		callback(null);
	}).error(function(err) {
		callback(err);
	});
};

exports.editProject = function(id, newProject, callback) {
	Project.update({
		company: newProject.company,
		range: newProject.range,
		description: newProject.description
	}, {
		id: id
	}).success(function(project) {
		callback(null);
	}).error(function(err) {
		callback(err);
	});
};

exports.addProject = function(resumeId, newProject, callback) {
	Project.create({
		range: newProject.range,
		company: newProject.company,
		description: newProject.description,
		resume_id: resumeId
	}).success(function(project) {
		callback(null);
	}).error(function(err) {
		callback(err);
	});
};

exports.deleteProject = function(project_id, callback) {
	Project.destroy({
		id: project_id
	}).success(function(project) {
		callback(null);
	}).error(function(err) {
		callback(err);
	});
};

exports.addNewResume = function(userId, newResume, callback) {
	Resume.create({
		name: newResume.basicInfo.name,
		email: newResume.basicInfo.email,
		age: newResume.basicInfo.age,
		gender: newResume.basicInfo.gender,
		address: newResume.basicInfo.address,
		user_id: userId
	}).success(function(resume) {
		if (newResume.education.school !== '') {
			Education.create({
				range: newResume.education.range,
				school: newResume.education.school,
				major: newResume.education.major,
				resume_id: resume.id
			}).success(function(education) {
				//callback(null);
			}).error(function(err) {
				callback(err);
			});
		}
		if (newResume.project.company !== '') {
			Project.create({
				range: newResume.project.range,
				company: newResume.project.company,
				description: newResume.project.description,
				resume_id: resume.id
			}).success(function(project) {
				//callback(null);
			}).error(function(err) {
				callback(err);
			});
		}
		callback(null);
	}).error(function(err) {
		callback(err);
	});
};