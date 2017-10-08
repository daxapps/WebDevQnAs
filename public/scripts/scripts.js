
$("#show-answers-btn").on('click', function(event) {
	event.preventDefault();	
	if($("#show-answers-btn").text() === "Show Answers"){
		$('.hide-answer').show();
		$('#show-answers-btn').text("Hide Answers");
	} else {
		$('.hide-answer').hide();
		$('#show-answers-btn').text("Show Answers");
	};
});

$(".show-gen-cat").on('click', function(event) {
	event.preventDefault();
	$('.gen-questions').toggleClass("hidden");
})

$(".show-html-cat").on('click', function(event) {
	event.preventDefault();
	$('.html-questions').toggleClass("hidden");
})

$(".show-css-cat").on('click', function(event) {
	event.preventDefault();
	$('.css-questions').toggleClass("hidden");
})

$(".show-js-cat").on('click', function(event) {
	event.preventDefault();
	$('.js-questions').toggleClass("hidden");
})

$(".show-testing-cat").on('click', function(event) {
	event.preventDefault();
	$('.testing-questions').toggleClass("hidden");
})

$(".show-performance-cat").on('click', function(event) {
	event.preventDefault();
	$('.performance-questions').toggleClass("hidden");
})

$(".show-network-cat").on('click', function(event) {
	event.preventDefault();
	$('.network-questions').toggleClass("hidden");
})

$(".show-coding-cat").on('click', function(event) {
	event.preventDefault();
	$('.coding-questions').toggleClass("hidden");
})

$(".show-fun-cat").on('click', function(event) {
	event.preventDefault();
	$('.fun-questions').toggleClass("hidden");
})

$(".show-react-cat").on('click', function(event) {
	event.preventDefault();
	$('.react-questions').toggleClass("hidden");
})

$(".show-algo-cat").on('click', function(event) {
	event.preventDefault();
	$('.algo-questions').toggleClass("hidden");
})

$(".show-ds-cat").on('click', function(event) {
	event.preventDefault();
	$('.ds-questions').toggleClass("hidden");
})

function flip(show, hide) {
	$(".flashcardEvent ." + hide + "").fadeOut(200);
	$(".flashcardEvent ." + show + "").delay(220).fadeIn();
}

function playFlashcard() {
	var currentCard = 1, // At First Card (1)
		lastCard = $(".flashcardEvent").length; //Last Card
		$("#flipCard").on("click", function() {
			var side = $(this).attr("data-side");
			if (side == "front") {
				flip("back", side);
				$("#flipCard").attr("data-side", "back");
			} else {
				flip("front", side);
				$("#flipCard").attr("data-side", "front");
			}
		});
		$("#nextCard").on("click", function() {
			flip("front", "back");
			$("#flipCard").attr("data-side", "front");
			if (currentCard != lastCard) {
				var nextCard = parseInt(currentCard) + 1;
			} else {
				var nextCard = 1;
			}
			$(".flashcardEvent:nth-child(" + currentCard + ")").fadeOut(200);
			$(".flashcardEvent:nth-child(" + nextCard + ")").delay(220).fadeIn();
			if (currentCard >= lastCard) {
				currentCard = 1;
			} else {
				currentCard == parseInt(currentCard++);
			}
		});
		$("#prevCard").on("click", function() {
			flip("front", "back");
			$("#flipCard").attr("data-side", "front");
			if (currentCard != 1) {
				var nextCard = parseInt(currentCard) - 1;
			} else {
				var nextCard = $(".flashcardEvent").length;
			}
			$(".flashcardEvent:nth-child(" + currentCard + ")").fadeOut(200);
			$(".flashcardEvent:nth-child(" + nextCard + ")").delay(220).fadeIn(200);
			if (currentCard <= 1) {
				currentCard = $(".flashcardEvent").length;
			} else {
				currentCard == parseInt(currentCard--);
			}
		});
	};

	playFlashcard();