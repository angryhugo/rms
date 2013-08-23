$(function() {
	var _changePasswordForm = $('#change-password-form');
	var _changeBtn = $('#btn-change-password');
	var _backBtn = $('#btn-back');

	_changePasswordForm.validate({
		rules: {
			old_password: {
				required: true,
				minlength: 6,
				maxlength: 16
			},
			password1: {
				required: true,
				minlength: 6,
				maxlength: 16
			},
			password2: {
				required: true,
				equalTo: "#input-password1"
			}
		}
	});

	_backBtn.on('click', function() {
		window.location.href = '/resumes';
	});
});