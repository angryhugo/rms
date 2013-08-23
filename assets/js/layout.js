$(function() {
    $('#logout').on('click', function() {
        $.ajax({
            url: '/account/logout',
            type: 'POST',
            dataType: 'text',
            success: function(data) {
                window.location.href = '/account/login';
            },
            error: function(xhr, status, err) {
                alert(xhr.responseText);
            }
        });
    });
});