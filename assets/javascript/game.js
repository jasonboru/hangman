
$(document).ready(function() {

  /*word bank, single words for now*/
  var words = [
    //"Dracula", "Shogun", "Beowulf", "Lolita", "Foundation", "Faust", "Ulysses", "Utopia", "Walden",
    //"Siddhartha", "Steppenwolf", "Inferno", "Hamlet", "Macbeth", "Persuasion", "Twilight",
    //"Ivanhoe", "Frakenstein", "Metamorphoses", "Firestarter", "Choke", "Lancelot", "Galapagos",
    "The Great Gatsby",
  ];

  $(function() {
    var currentImage = 1;
    var word;
    var remainingletters;
    var secret;
    var wins = 0
    var loses = 0
	
    String.prototype.replaceAt=function(index, character) {
	  return this.substr(0, index) + character + this.substr(index+character.length);
	}
	
	function setup(theWord) {
	  word = theWord.toUpperCase();
	  remainingletters = word;
	  secret = word.replace(/./g, '_');
	  $('#secret').text(secret);
	}

	theWord = getWord();	
	setup(theWord);
	$("#wins").html(wins);
	$("#loses").html(loses);
	
	function processletter(letter) {
	  var found = false;
	  for (var i = 0 ; i < remainingletters.length ; i++) {
	    if (remainingletters.charAt(i) == letter) {
		  remainingletters = remainingletters.replaceAt(i, '_');
		  secret = secret.replaceAt(i, letter);
		  found = true;
			}
		}
		if (found) {
			$('#secret').text(secret);
			if (secret.indexOf('_') == -1) {
				alert('You won!');
				wins++;
				$("#wins").html(wins);
				reset();
				currentImage=1;
			}
		} else {
			currentImage++;
			var imageId = '#hangman_' + currentImage;
			$(imageId).fadeTo(300, 1.0, function() {
				if (currentImage == 7) {
					$('#secret').text(word);
					alert('You lost!');
					loses++;
					$("#loses").html(loses);					
					reset();
					currentImage=1;
				}
			});
		}
	}
	
	$('.letters span').click(function(event) {
		var letter = event.target.innerText;
		$(event.target).addClass('disabled');
		processletter(this.innerText);
	});
	
	function getWord() {
		while (true) {
			var theWord = words[Math.floor(Math.random() * words.length)];
			return theWord;			
		}
	}	

	function reset() {
		$('.letters span').removeClass("disabled");
		$(".hangman").css("opacity", 0);
        $("#hangman_1").css("opacity", 1);
		theWord = getWord();
		setup(theWord);
	}
	


  });
 });