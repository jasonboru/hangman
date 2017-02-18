  // adding dictionary and word filter //
  var words = [
    "Dracula","Shogun","Beowulf","Lolita","Foundation","Faust","Ulysses","Utopia","Walden",
    "Siddhartha", "Steppenwolf","Inferno",
  ];

  $(function() {
	var currentImage = 1;
	var word;
	var remainingletters;
	var secret;
	
	String.prototype.replaceAt=function(index, character) {
		return this.substr(0, index) + character + this.substr(index+character.length);
	}
	
	function setup(theWord) {
		word = theWord.toUpperCase();
		remainingletters = word;
		secret = word.replace(/./g, '_');
		$('#secret').text(secret);
	}
	
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
				location.reload();
			}
		} else {
			currentImage++;
			var imageId = '#hangman_' + currentImage;
			$(imageId).fadeTo(300, 1.0, function() {
				if (currentImage == 7) {
					$('#secret').text(word);
					alert('You lost!');
					location.reload();
				}
			});
		}
	}
	
	$('.letters span').click(function(event) {
		var letter = event.target.innerText;
		$(event.target).addClass('disabled');
		$(event.target).unbind('click');
		processletter(this.innerText);
	});
	
	//var words=['CAT','CAR','BAG'];
	function getWord() {
		while (true) {
			var theWord = words[Math.floor(Math.random() * words.length)];
			return theWord;			
		}
	}	
	
	theWord = getWord(5);	
	setup(theWord);

});