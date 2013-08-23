$(function() {
	$(".form_datetime").datetimepicker({
		format: 'MM yyyy',
		autoclose: true,
		startView: 3, //star年试图（月份）
		minView: 3, //最小年试图（月份）
		maxView: 4 //最大十年试图（年份）
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
			age: {
				required: true,
				digits: true,
				min: 1,
				max: 120
			},
			address: "required"
		}
	});
});