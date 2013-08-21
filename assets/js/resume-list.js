$(function() {
    var _indexMenu = $('#menu-item-index');
    _indexMenu.addClass('active');

    $('.btn-show-resume').on('click', function() {
        var index = $(this).data("index");
        window.location.href = '/resumes/' + index;
    });

    $('#btn-add-resume').on('click', function() {
        window.location.href = '/resumes/new';
    });

    var deleteResume = function(index) {
        if (confirm("确定要删除吗？")) {
            $.ajax({
                url: '/resumes/' + index,
                type: 'DELETE',
                dataType: 'text',
                success: function(data) {
                    alert(data);
                    $('#resume-list' + index).remove();
                },
                error: function(xhr, status, err) {
                    alert(xhr.responseText);
                }
            });
        }
    };

    $('.btn-delete-resume').on('click', function() {
        var index = $(this).data("index");
        deleteResume(index);
    });
});