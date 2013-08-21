$(function() {
    $(".form_datetime").datetimepicker({
        format: 'MM yyyy',
        autoclose: true
    });
    var _showResumeMenu = $('#menu-item-show-resume')
    var _editProfile = $('#edit-profile');
    var _editEducation = $('#edit-education');
    var _resumeName = $('#resume-name');
    var _age = $('#age');
    var _email = $('#email');
    var _gender = $('#gender');
    var _address = $('#address');
    var _editName = $('#edit-name')
    var _editAge = $('#edit-age');
    var _editGender = $('#edit-gender');
    var _editEmail = $('#edit-email');
    var _editAddress = $('#edit-address');
    var _eidtUniversity = $('#edit-university');
    var _editUniversityMajor = $('#edit-university-major');
    var _editUniversityPeriodTo = $('#edit-university-period-to');
    var _editUniversityPeriodFrom = $('#edit-university-period-from');
    var _submitEditResumeBtn = $('#btn-edit-resume-submit');
    var _showEditResumeBtn = $('#btn-show-edit-resume');
    var _submitEditProfileBtn = $('#btn-edit-profile-submit');
    var _cancelEditEducationBtn = $('#btn-edit-education-cancle');
    var _submitEditEducationBtn = $('#btn-edit-education-submit');
    var _showAddEducationBtn = $('#btn-show-add-education');
    var _editEducationForm = $('#edit-education-form');
    var _editResumeForm = $('#edit-resume-form');

    var _presentEducationIndex;
    var _resumeId = $('#resume-id').text();

    _showResumeMenu.addClass('active');

    var showEditResume = function() {
        _editName.val(_resumeName.text());
        _editAge.val(_age.text());
        _editGender.val(_gender.text());
        _editEmail.val(_email.text());
        _editAddress.val(_address.text());
        //$('#resume-index').val(_showEditResumeBtn.data('index'));
    }

    var submitEditResume = function() {
        if (confirm("确定保存修改吗？")) {
            _editResumeForm.submit();
        }
    }

    var showEditEducation = function(index) {
        _editEducationForm.attr('action', '/resumes/' + _resumeId + '/education/' + index);
        var educationPeriod = $('#university-period' + index).text();
        _eidtUniversity.val($('#university' + index).text());
        _editUniversityPeriodFrom.val(educationPeriod.substring(0, educationPeriod.lastIndexOf("-")));
        _editUniversityPeriodTo.val(educationPeriod.substring(educationPeriod.lastIndexOf("-") + 1, educationPeriod.length));
        _editUniversityMajor.val($('#university-major' + index).text());
        _presentEducationIndex = index;
    }

    //清空输入框
    var emptyEditEducation = function() {
        _eidtUniversity.val("");
        _editUniversityPeriodFrom.val("");
        _editUniversityPeriodTo.val("");
        _editUniversityMajor.val("");
    }

    var submitEditEducation = function() {
        //_editEducation.fadeOut();
        if (confirm("确定保存修改吗？")) {
            if (_presentEducationIndex !== 10000) {
                $('#education-list-index').val(_presentEducationIndex);
            }
            _editEducationForm.submit();
        }
    }

    var deleteEducation = function(index) {
        if (confirm("确定要删除吗？")) {
            $.ajax({
                url: '/resumes/' + _resumeId + '/education/' + index,
                type: 'DELETE',
                dataType: 'text',
                success: function(data) {
                    alert(data);
                    $('#education-list' + index).remove();
                },
                error: function(xhr, status, err) {
                    alert(xhr.responseText);
                }
            });
        }
    }

    _showEditResumeBtn.bind('click', showEditResume);

    _submitEditResumeBtn.bind('click', submitEditResume);

    $('.btn-show-edit-education').on('click', function() {
        var index = $(this).data("index");
        showEditEducation(index);
    });

    $('.btn-delete-education').on('click', function() {
        var index = $(this).data("index");
        deleteEducation(index);
    });

    _cancelEditEducationBtn.bind('click', function() {
        //_editEducation.fadeOut("slow");
        //清空
        _eidtUniversity.val("");
        $('#edit-university-period').val("");
        _editUniversityMajor.val("");
        _editUniversityDescription.val("");
    });

    _submitEditEducationBtn.bind('click', submitEditEducation);

    _showAddEducationBtn.bind('click', function() {
        //_editEducation.fadeIn("slow");
        _presentEducationIndex = 10000; //定义10000时 为添加新条目
        emptyEditEducation();
        _editEducationForm.attr('action', '/resumes/' + _resumeId + '/education/new');
    });

    _editResumeForm.validate({
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
            gender: "required",
            address: "required"
        }
    });


});