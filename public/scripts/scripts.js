$(".hide-answers-btn").on('click', function(event) {
	event.preventDefault();
	$('.answer, .hide-answers-btn').hide()
	$('.show-answers-btn').show()
})

$(".show-answers-btn").on('click', function(event) {
	event.preventDefault();
	$('.answer, .hide-answers-btn').show()
	$('.show-answers-btn').hide()

})