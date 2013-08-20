var entityFactory = require('./entityFactory');

var sequelize = entityFactory.sequelize;
var User = entityFactory.User;
var Resume = entityFactory.Resume;
var Education = entityFactory.Education;
var Project = entityFactory.Project;

exports.showResumeInfo = function(id, callback) {
	var allInfo = {};
	Resume.find(id).success(function(resume) {
		if (!resume) {
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
					allInfo.title = 'RMS';
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
	})
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
	})
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
	})
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