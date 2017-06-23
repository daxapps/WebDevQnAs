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

// function resetCard() {
// 		var currentCard = null, // At First Card (1)
// 				lastCard = null; //For timer
// 		flip("front", "back");
// 		$("#flipCard").attr("data-side", "front");
// 		$(".flashcardEvent").fadeOut(200);
// 		$(".flashcardEvent:nth-child(1)").delay(220).fadeIn(200);
// 		playFlashcard()
// }

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
}

playFlashcard();

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

