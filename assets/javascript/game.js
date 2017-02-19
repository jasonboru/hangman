$(document).ready(function() {

  /*word bank, single words for now*/
  var words = [
    "Dracula", "Shogun", "Beowulf", "Lolita", "Foundation", "Faust", "Ulysses", "Utopia", "Walden",
    "Siddhartha", "Steppenwolf", "Inferno", "Hamlet", "Macbeth", "Persuasion", "Twilight",
    "Ivanhoe", "Frakenstein", "Metamorphoses", "Firestarter", "Choke", "Lancelot", "Galapagos",
    "The Great Gatsby", "Don Quixote", "War and Peace", "On the Road", "the Illiad", "Brave New World", 
    "Lord of the Flies", "The Sun Also Rises", "The Scarlet Letter", "Candide", "Little Women",
    "Moby Dick", "A Tale of Two Cities", "The Time Machine", "The Trial", "The Jungle Book", 
    "The Grapes of Wrath", "Slaughterhouse Five", "Of Mice and Men", "Heart of Darkness", 
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
	  secret = word.replace(/\w/g, '_');
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
				alert('Good job you won! You are really well read.');
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
					loses++;
					$("#loses").html(loses);					
					reset();
					alert("Sorry you lost. I'm sure you've read the next book!");
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