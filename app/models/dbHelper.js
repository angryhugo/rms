var entityFactory = require('./entityFactory');

var sequelize = entityFactory.sequelize;
var User = entityFactory.User;
var Resume = entityFactory.Resume;
var Education = entityFactory.Education;
var Project = entityFactory.Project;

exports.login = function(email, password, callback) {
	User.findAll({
		where: {
			email: email,
			password: password
		}
	}).success(function(user) {
		if (user.length) {
			callback(null, user[0].id);
		} else {
			callback(null, 0);
		}
	}).error(function(err) {
		callback(err);
	})
};

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
	})
};

exports.showResumeInfo = function(userId, resumeId, callback) {
	var allInfo = {};
	User.find(userId).success(function(user) {
		Resume.find(resumeId).success(function(resume) {
			if (!resume || resume.user_id != userId) { //简历不存在或者简历不是该用户的
				callback(null, allInfo, false);
			} else {
				Education.findAll({
					where: ["resume_id = ?", resume.id]
				}).success(function(educations) {
					Project.findAll({
						where: {
							resume_id: resume.id
						}
					}).success(function(projects) {
						allInfo.title = 'show resume info';
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
	Resume.find(id).success(function(resume) {
		resume.name = newResume.name;
		resume.age = newResume.age;
		resume.gender = newResume.gender;
		resume.email = newResume.email;
		resume.address = newResume.address;
		resume.save().success(function(resume) {
			callback(null);
		}).error(function(err) {
			callback(err);
		});
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
	Education.find(id).success(function(education) {
		education.range = newEducation.range;
		education.school = newEducation.school;
		education.major = newEducation.major;
		education.save().success(function(education) {
			callback(null);
		}).error(function(err) {
			callback(err);
		});
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
	Education.find(education_id).success(function(education) {
		education.destroy().success(function(edu) {
			callback(null);
		}).error(function(err) {
			callback(err);
		});
	}).error(function(err) {
		callback(err);
	});
};

exports.editProject = function(id, newProject, callback) {
	Project.find(id).success(function(project) {
		project.range = newProject.range;
		project.company = newProject.company;
		project.description = newProject.description;
		project.save().success(function(project) {
			callback(null);
		}).error(function(err) {
			callback(err);
		});
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
	Project.find(project_id).success(function(project) {
		project.destroy().success(function(pro) {
			callback(null);
		}).error(function(err) {
			callback(err);
		});
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
		Education.create({
			range: newResume.education.range,
			school: newResume.education.school,
			major: newResume.education.major,
			resume_id: resume.id
		}).success(function(education) {
			Project.create({
				range: newResume.project.range,
				company: newResume.project.company,
				description: newResume.project.description,
				resume_id: resume.id
			}).success(function(project) {
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