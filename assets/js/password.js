$(function() {
	var _changePasswordForm = $('#change-password-form');
	var _changeBtn = $('#btn-change-password');

	_changePasswordForm.validate({
		rules: {
			old_password: {
				required: true,
				minlength: 6,
				maxlength: 16
			},
			new_password: {
				required: true,
				minlength: 6,
				maxlength: 16
			},
			new_password_again: {
				required: true,
				equalTo: "#input-new-password"
			}
		}
	});

});