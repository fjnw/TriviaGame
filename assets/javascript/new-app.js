var bank = [
	{
		question: "What color is the sky?",
		choices: ["Blue", "Green", "Red"],
		answer: "Blue"
	},{
		question: "What's the teachers name?",
		choices: ["Maggie", "Reuben", "Phil"],
		answer: "Phil"
	},{
		question: "What days does class meet?",
		choices: ["Monday, Wednesday, Saturday", "Tuesday, Thursday, Saturday", "None of the above"],
		answer: "Monday, Wednesday, Saturday"
	} 
];

var correct = 0;					// correct responses
var incorrect = 0;				// incorrect responses
var time;							// seconds on timer
var option = '';					// options in dropdown
var intervalId; 					// timer: var hold setInterval that runs the stopwatch
var clockRunning = false; 		// prevents the clock from being sped up unnecessarily
var s = 5;							// number of seconds for questions & results screen

//===========================================//
//                                           //
//         		   StartGame                  //
//                                           //
//===========================================//

$("#start-btn").on('click', function(){
	// randomize question bank
	randomizeBank(bank);

	// display game area & game info
	// print header, question, and choices 
	// starts timer
	gameInit();
});


$("#restart-btn").on('click', function(){
	// randomize question bank
	randomizeBank(bank);

	// resetting
	$('#timer').css('visibility', 'visible')
	correct = 0;
	incorrect = 0;

	// display game area & game items
	// print game info (header, question, and choices)
	// starts timer
	gameInit();
});

//===========================================//
function randomizeBank(array){
		for (var i=bank.length-1; i>0; i--) {
		var j = Math.floor(Math.random() * (i+1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

//===========================================//
function gameInit(){
	stopTimer(); // for resetting

	// displays game area
	$('#start-btn').css("visibility","hidden");
	$('#restart-btn').css("visibility","visible");
	$('#result-area').css("visibility","hidden");
	
	// prints game info
	$("#game-area").css("visibility", "visible");
	$("#result-area").css("visibility", "hidden"); // for resetting
	$("#correct-counter").html(correct);
	$("#incorrect-counter").html(incorrect);
	$("#timer").html(timeConverter(s));

	// print question + question header
	$('#question-list').html(
		'<h4>Question '+ ((correct+incorrect +1) +" out of " + bank.length) +'</h4>' + // question # in header
		'<p>'+ bank[correct+incorrect].question + '</p>'	// question text, below header
	);

	// makes dropdown & prints <option> in dropdown
	option = "";
	$('#choices-area').html('<select id="choices-list" multiple="multiple"></select>');
	for (var i=0; i<bank[correct+incorrect].choices.length; i++) {
   	option += '<option>' + bank[correct+incorrect].choices[i] + '</option>';
	};
	$('#choices-list').prepend(option);

	// start timer
	startTimer(s);

	// onclick - <select> value selected 
   $('select').on('click', function() {
   	userGuess = $("#choices-list").val();
   	validate();
   });
}

//===========================================//
function	validate(){
	stopTimer();
	var userGuess = $("#choices-list").val();
	// if correct
	if (userGuess == bank[correct+incorrect].answer) {
		correct++;
		$('#result-image').html('<img src="assets/images/correct.gif"/>');
		printResults();
		// game over check (no more questions)
		if ( (correct+incorrect) == bank.length) {
			$('#timer').css('visibility', 'hidden')
			$('#result-text').html('<p id="result-end">...GAME OVER...</p>');
		} else {
			resultsTimer(s);
		}
	// if incorrect
	} else {
		incorrect++;
		$('#result-image').html('<img src="assets/images/incorrect.gif"/>');
		printResults();
		// game over check (no more questions)
		if ( (correct+incorrect) == bank.length) {
			$('#timer').css('visibility', 'hidden')
			$('#result-text').html('<p id="result-end">...GAME OVER...</p>');
		} else {
			resultsTimer(s);
		}
	}
}

//===========================================//
function printResults(){
	$("#correct-counter").html(correct);
	$("#incorrect-counter").html(incorrect);
	$("#timer").html(timeConverter(s));

	$('#result-area').css("visibility","visible");
}

//===========================================//
function startTimer(sec){
	time = sec;
	if (!clockRunning) {
		intervalId = setInterval(function(){
			time--;
			var converted = timeConverter(time);
			$("#timer").html(converted);
			if (time === 0){
				stopTimer();
				validate();
			}
		}, 1000);
		clockRunning = true;
	}
}

function resultsTimer(sec) {
	time = sec;
	if (!clockRunning) {
		intervalId = setInterval(function(){
			time--;
			var converted = timeConverter(time);
			$("#timer").html(converted);
			if (time === 0){
				gameInit();
			}
		}, 1000);
		clockRunning = true;
	}
}

function stopTimer(){
	clearInterval(intervalId);
	clockRunning = false;
}

function timeConverter(t) {
	var minutes = Math.floor(t / 60);
	var seconds = t - (minutes * 60);
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	if (minutes === 0) {
		minutes = "00";
	} else if (minutes < 10) {
		minutes = "0" + minutes;
	}
	return minutes + ":" + seconds;
}



/*
//===========================================//
//				NEW GAME - PSUEDO CODE 				//
//===========================================//
onclick -- start-btn -- startGame()
startGame()
		randomizeBank(array) shuffles question bank
				for loop
					randomize question bank into temp array
					bank = temp array

		gameInit()
				stopTimer()
				start-btn HIDDEN
				restart-btn VISIBLE
				result-area HIDDEN

				game-area VISIBLE
				game-results HIDDEN
				correct-counter PRINT
				incorrect-counter PRINT
				timer PRINT w/ (s) time thru timeConverter

				question header PRINT
				question text PRINT
				set choices to empty before printing new
				question choices PRINT

				startTimer()
						set time (seconds)
						setInterval(count,1000)
							count()
								lower time 1 second at a time
								convert time
										timeConverter()
								if time runs up: validate()
										validate()

				onclick -- select choice -- validate()
						validate()



onclick -- restart-btn -- restartGame()
restartGame()
		randomizeBank(array) shuffles question bank
				for loop
					randomize question bank into temp array
					bank = temp array

		timer VISIBLE
		correct counter = 0
		incorrect counter = 0

		gameInit()
				stopTimer()
				start-btn HIDDEN
				restart-btn VISIBLE
				result-area HIDDEN

				game-area VISIBLE
				game-results HIDDEN
				correct-counter PRINT
				incorrect-counter PRINT
				timer PRINT w/ (s) time thru timeConverter

				question header PRINT
				question text PRINT
				set choices to empty before printing new
				question choices PRINT

				startTimer()
						set time (seconds)
						setInterval(count,1000)
								count()
									lower time 1 second at a time
									convert time
											timeConverter()
									if time runs up: validate()
											validate()

				onclick -- select choice -- validate()
						validate()


validate()
		stop timer
				clearInterval(intervalId);
				clockRunning = false;

		if correct:
				correct counter ++
				result-image (correct) DISPLAY
				printResults();
						correct-counter PRINT
						incorrect-counter PRINT
						timer PRINT
						result-area visible
				if no more questions (game over)
						timer HIDDEN
						result-text "game over" PRINT
				else 
						resultsTimer()
								unlike startTimer(): no validate() or stopTimer()

		else incorrect:
				incorrect counter ++
				result-image (incorrect) DISPLAY
				printResults();
						correct-counter PRINT
						incorrect-counter PRINT
						timer PRINT
						result-area visible
				if no more questions (game over)
						timer HIDDEN
						result-text "game over" PRINT
				else
						resultsTimer()
							unlike startTimer(): no validate() or stopTimer()



//===========================================//
//				OLD GAME - PSUEDO CODE 				//
//===========================================//

onclick -- start game
	
	initGame()
		start-btn hidden
		next-btn hidden  -- delete?
		restart-btn visible

		counters set to 0;
			correct
			incorrect

		printToScreen() 
			correct counter
			incorrect counter
			timer
			result-area hidden

		game-area visible


	shuffle(randomizedBank)


	question()
		select question
		print header
		print question
		print choices

	startTimer()
		set time
		start clock setInterval(count,1000)

		count()
			lower time 1 second at a time
			convert time
				timeConverter()

			if time runs up: validate()
				validate()
					stop timer

					if correct
						correct counter ++
						printToScreen();

						result-area visible
						result-image display
						next-btn visible 

						if no more questions: gameover()
							gameover()
								stop time
								next-btn hidden
								result-text display

					else incorrect
						correct counter ++
						printToScreen();

						result-area visible
						result-image display
						next-btn visible 

						if no more questions: gameover()
							gameover()
								stop time
								next-btn hidden
								result-text display

			onclick next-btn  -- nextQuestion()
				nextQuestion()
				next-btn hidden
				choices cleared

				questions()
					select question
					print header
					print question
					print choices

				startTimer()
					set time
					start clock setInterval(count,1000)


				printToScreen()
					correct counter
					incorrect counter
					timer
					result-area hidden
*/

