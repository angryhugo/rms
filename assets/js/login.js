$(function() {
	var _loginForm = $('#login-form');
	var _loginBtn = $('#btn-login');
	var _signUpBtn = $('#btn-sign-up');

	// _loginBtn.on('click', function() {
	// 	$.ajax({
	// 		url: '/login',
	// 		type: 'POST',
	// 		dataType: 'json',
	// 		data: {
	// 			email: $('#input-email').val(),
	// 			password: $('#input-password').val()
	// 		},
	// 		success: function(data) {
	// 			if (data) {
	// 				window.location.href = '/resumes';
	// 			} else {
	// 				alert('帐号密码错误！');
	// 			}
	// 		},
	// 		error: function(xhr, status, err) {
	// 			alert(xhr.responseText);
	// 		}
	// 	});
	// });

	_loginForm.validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			password: "required"
		}
	});

	_signUpBtn.on('click', function() {
		window.location.href = '/account/sign_up';
	});
});