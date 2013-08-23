$(function() {
	var _signUpForm = $('#sign-up-form');
	var _loginBtn = $('#btn-login');
	var _signUpBtn = $('#btn-sign-up');

	_signUpForm.validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			name: "required",
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

	_loginBtn.on('click', function() {
		window.location.href = '/login';
	});
});