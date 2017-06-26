
$("#show-answers-btn").on("click", function(event) {
	event.preventDefault();	
	if($("#show-answers-btn").text() === "Show Answers"){
		$(".hide-answer").show();
		$("#show-answers-btn").text("Hide Answers");
	} else {
		$(".hide-answer").hide();
		$("#show-answers-btn").text("Show Answers");
	};
});

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