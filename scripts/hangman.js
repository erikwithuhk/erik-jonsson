var dictionary = [
  'time',
  'year',
  'people',
  'way',
  'day',
  'man',
  'thing',
  'woman',
  'life',
  'child',
  'world',
  'school',
  'state',
  'family',
  'student',
  'group',
  'country',
  'problem',
  'hand',
  'part',
  'place',
  'case',
  'week',
  'company',
  'system',
  'program',
  'question',
  'work',
  'government',
  'number',
  'night',
  'Mr',
  'point',
  'home',
  'water',
  'room',
  'mother',
  'area',
  'money',
  'storey',
  'fact',
  'month',
  'lot',
  'right',
  'study',
  'book',
  'eye',
  'job',
  'word',
  'business',
  'issue',
  'side',
  'kind',
  'head',
  'house',
  'service',
  'friend',
  'father',
  'power',
  'hour',
  'game',
  'line',
  'end',
  'member',
  'law',
  'car',
  'city',
  'community',
  'name',
  'president',
  'team',
  'minute',
  'idea',
  'kid',
  'body',
  'information',
  'back',
  'parent',
  'face',
  'others',
  'level',
  'office',
  'door',
  'health',
  'person',
  'art',
  'war',
  'history',
  'party',
  'result',
  'change',
  'morning',
  'reason',
  'research',
  'girl',
  'guy',
  'food',
  'moment',
  'air',
  'teacher'
]

var word = dictionary[Math.floor((Math.random() * 100) + 1)];
var letters = word.toUpperCase().split('');
var guessedLetters = [];
for(var letter in letters) {
  guessedLetters.push('_');
}
var wrongLetters = [];
var wrongGuesses = 0;

var countLetters = function(guessedLetter) {
  var count = 0;
  for(var i in letters) {
    if(letters[i] === guessedLetter) {
      count += 1;
    }
  }
  return count;
};

var hasLetter = function(array, guessedLetter) {
	if(array.includes(guessedLetter)) {
    if(countLetters(guessedLetter) > 1) {
      $('.validation').html('There are ' + countLetters(guessedLetter) + ' ' + guessedLetter + 's.');
    } else if(countLetters(guessedLetter) === 1) {
  		$('.validation').html('There is one ' + guessedLetter + '.');
    }
	} else {
    pushWrongLetter(guessedLetter);
		$('.validation').html('Sorry, there are no ' + guessedLetter + 's.');
	}
}

var pushWrongLetter = function(letter) {
  wrongLetters.push(letter);
  $('.wrong-letters').html('Already guessed: ' + wrongLetters.sort().join(' '));
  wrongGuesses += 1;
  $('.wrong-guesses').html(wrongGuesses);
  // drawHangman();
};

var checkLetter = function(guessedLetter) {
	hasLetter(letters, guessedLetter);
	for(var i in letters) {
		if(guessedLetter === letters[i]) {
			guessedLetters[i] = letters[i];
		}
	}
	$('.word-to-guess').html(guessedLetters.join(' '));
  over();
};

var over = function() {
	if(!guessedLetters.includes('_')) {
    $('.prompt').hide();
    $('input').hide();
    $('.guess').hide();
		$('.win').html('Congratulations, you won!');
    $('.reset').html('Play again');
		return true;
	} else {
		return false;
	}
};

var play = function() {
  $('.prompt').html('What letter would you like to guess?');
  $('.word-to-guess').html(guessedLetters.join(' '));
}

var reset = function() {
  word = dictionary[Math.floor((Math.random() * 10) + 1)];
  letters = word.toUpperCase().split('');
  guessedLetters = [];
  for(var letter in letters) {
    guessedLetters.push('_');
  }
  wrongLetters = [];
  wrongGuesses = 0;
  $('.validation').html('');
  $('.word-to-guess').html(guessedLetters.join(' '));
  $('.wrong-letters').html('');
  $('.wrong-guesses').html('');
  $('.win').html('');
  $('.prompt').show();
  $('input').show();
  $('.guess').show();
  $('.gallows').html('');
}

var drawHangman = function() {
  if(wrongGuesses === 1) {
    $('.gallows').html('_____');
  } else if(wrongGuesses === 2) {
    $('.gallows').html('&nbsp;&nbsp;|<br>&nbsp;&nbsp;|<br>&nbsp;&nbsp;|<br>&nbsp;&nbsp;|<br>&nbsp;&nbsp;|<br>__|__');
  }
};
//   ________
//   |      |
//   |      O
//   |     \|/
//   |      |
//   |     / \
// __|__

$('.guess').click(function() {
  var guess = $('input').val();
  checkLetter(guess.toUpperCase());
  $('input').val('');
  $(function() {
    $("input").focus();
  });
});

$('input').keypress(function (e) {
  if (e.which == 13) {
    var guess = $('input').val();
    checkLetter(guess.toUpperCase());
    $('input').val('');
  }
});

$('.reset').click(function() {
  reset();
});

$(document).ready(function() {
  $('.reset').html('Reset');
  play();
});
