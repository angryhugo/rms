$(function() {
	$(".form_datetime").datetimepicker({
		format: 'MM yyyy',
		autoclose: true
	});

	var _newResumeForm = $('#new-resume-form');
	var _submitNewResumeBtn = $('#btn-new-resume-submit');
	var _newResumeMenu = $('#menu-item-new-resume');
	_newResumeMenu.addClass('active');

	var submitNewResume = function() {
		if (confirm("确定保存修改吗？")) {
			_newResumeForm.submit();
		}
	};

	_submitNewResumeBtn.on('click', submitNewResume);

	_newResumeForm.validate({
		rules: {
			resume_name: {
				required: true,
				minlength: 2
			},
			email: {
				required: true,
				email: true
			},
			age: "required",
			address: "required"
		}
	});
});