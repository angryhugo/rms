$(function() {
	var _signUpForm = $('#sign-up-form');

	_signUpForm.validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			name: "required",
			password: {
				required: true,
				minlength: 6,
				maxlength: 16
			},
			password_again: {
				required: true,
				equalTo: "#input-password"
			}
		}
	});
});