$(function() {
	var _indexMenu = $('#menu-item-index');
	_indexMenu.addClass('active');

	$('.btn-show-resume').on('click', function() {
		var index = $(this).data("index");
		window.location.href = '/resumes/' + index;
	});
});