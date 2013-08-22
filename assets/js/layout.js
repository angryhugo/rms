$(function() {
    $('#logout').on('click', function() {
        $.ajax({
            url: '/logout',
            type: 'POST',
            dataType: 'text',
            success: function(data) {
                window.location.href = '/login';
            },
            error: function(xhr, status, err) {
                alert(xhr.responseText);
            }
        });
    });
});