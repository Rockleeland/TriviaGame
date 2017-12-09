$(document).ready(function(){
	//Trivia Game
var triviaGame = {

//Array for questions and answers
	qAndA:[{
		question: "The movie began with the First Order trying to recover what?",
			ans1: "Darth Vader's lightsaber",
			ans2: "The Millenium Falcon",
			ans3: "C-3PO's arm",
			ans4: "A map leading to Luke Skywalker",
			imgUrl: "./assets/images/First-Order.gif"},
	   {
	   	question: "Who was Kylo Ren's father?",
			ans1: "Luke Skywalker",
			ans2: "Han Solo",
			ans3: "Supreme Leader Snoke",
			ans4: "Emperor Palpatine",
			imgUrl: "./assets/images/han-solo.gif"},
		{
	   	question: "What was the status of Han Solo at the end of the movie?",
			ans1: "Alive and well",
			ans2: "Dead, killed by his son",
			ans3: "Severely injured after crashing the Millenium Falcon",
			ans4: "Unconscious after hitting his head",
			imgUrl: "./assets/images/kylo-han.gif"},
	   {
	   	question: "Who gave Finn Anakin/Luke Skywalker's old lightsaber?",
			ans1: "Maz Kanata",
			ans2: "Princess Leia",
			ans3: "Unkar Plutt",
			ans4: "Luke Skywalker",
			imgUrl: "./assets/images/maz-kanata.gif"},
		{
		question: "What is Finn\'s given name?",
		    ans1: "FN-2117",
		    ans2: "FN-2087",
		    ans3: "FN-2187",
		    ans4: "FN-2007",
			imgUrl: "./assets/images/finn.gif"}],

	//array to hold correct answers		
	correctAnswers: ['A map leading to Luke Skywalker', 'Han Solo', 'Dead, killed by his son', 'Maz Kanata', 'FN-2187'],
	userAnswers: [],

	questionCount: 0,
	beginInt: 0,

	timer: 30,
	btnClicked: false,
	numberCorrect: 0,
	numberIncorrect: 0,
	numberUnAnswered: 0,
	playMusic: new Audio("./assets/sounds/star-wars-music.mp3"),

	beginGame: function(){
		triviaGame.playMusic.play();	
		if(triviaGame.questionCount === triviaGame.qAndA.length){

			triviaGame.gameFinished();
			triviaGame.timer = 30;

		} else {

			if(triviaGame.questionCount >= 1){
				clearInterval(triviaGame.displayNextInt);
				$('#gameStart').show();
				$('#divAnswers').hide();
				triviaGame.timer = 30;
				$('#time').html(triviaGame.timer); 
			}

			$('p.questions').html(triviaGame.qAndA[triviaGame.questionCount].question);
			$('#answer1').html(triviaGame.qAndA[triviaGame.questionCount].ans1);
			$('#answer2').html(triviaGame.qAndA[triviaGame.questionCount].ans2);
			$('#answer3').html(triviaGame.qAndA[triviaGame.questionCount].ans3);
			$('#answer4').html(triviaGame.qAndA[triviaGame.questionCount].ans4);

			triviaGame.beginInt = setInterval(triviaGame.countDown, 1000);

		}

	},
//Cound down timer 
	countDown: function(){

		triviaGame.timer--;
		$('#time').html(triviaGame.timer);

		if(triviaGame.timer === 0){

			triviaGame.oufOfTime();
			triviaGame.playMusic.pause();

		} else if(triviaGame.btnClicked === true && triviaGame.correctAnswers[triviaGame.questionCount] === triviaGame.userAnswers[triviaGame.questionCount]){
		
			triviaGame.answersCorrect();
			triviaGame.playMusic.play();

		} else if(triviaGame.btnClicked === true && triviaGame.correctAnswers[triviaGame.questionCount] != triviaGame.userAnswers[triviaGame.questionCount]){

			triviaGame.answersWrong();
			triviaGame.playMusic.pause();
		}

	},
//If player chooses the correct answer
	answersCorrect: function(){

		if(newImg != ""){

			$('#pic').empty();
		}

		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#outOfTime').hide();
		$('#wrongMsg').hide();	
		$('#correctMsg').show();
		$('#pCorrectAnswer').hide();	
		$('#answers').css('display', 'block');
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(triviaGame.timer);

		clearInterval(triviaGame.beginInt);

		var newImg = $("<img>").attr('src', triviaGame.qAndA[triviaGame.questionCount].imgUrl).attr('width', '130px','height', '130px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);		
		triviaGame.btnClicked = false;

		triviaGame.displayNextInt = setInterval(triviaGame.beginGame, 3000);
		triviaGame.numberCorrect++;
		triviaGame.questionCount++;
	},
//If player chooses the incorrect answer
	answersWrong: function(){

		if(newImg != ""){

			$('#pic').empty();
		}

		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#outOfTime').hide();
		$('#wrongMsg').show();
		$('#correctMsg').hide();
		$('#pCorrectAnswer').show();
		$('#pCorrectAnswer span').html(triviaGame.correctAnswers[triviaGame.questionCount]);
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(triviaGame.timer);
		clearInterval(triviaGame.beginInt);

		var newImg = $("<img>").attr('src', triviaGame.qAndA[triviaGame.questionCount].imgUrl).attr('width', '115px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);

		triviaGame.btnClicked = false;
		triviaGame.displayNextInt = setInterval(triviaGame.beginGame, 5000);
		triviaGame.numberIncorrect++;
		triviaGame.questionCount++;
	},
//If the player is out of time 
	oufOfTime: function(){

		if(newImg != ""){

			$('#pic').empty();
		}

		triviaGame.userAnswers.push(""); 
		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#pCorrectAnswer span').html(triviaGame.correctAnswers[triviaGame.questionCount]);
		$('#pCorrectAnswer').show();
		$('#correctMsg').hide();
		$('#wrongMsg').hide();		
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(triviaGame.timer);	
		clearInterval(triviaGame.beginInt);
		var newImg = $("<img>").attr('src', triviaGame.qAndA[triviaGame.questionCount].imgUrl).attr('width', '115px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);

		triviaGame.numberUnAnswered++;

		triviaGame.displayNextInt = setInterval(triviaGame.beginGame, 5000);

		triviaGame.questionCount++;	

	},
//Restart function
	restart: function(){

		triviaGame.questionCount = 0;
		triviaGame.userAnswers.length = 0;
		$('#time').html("30");

		triviaGame.beginGame();
		$('#gameStart').show();
		$('#gameComplete').hide();
		$('#restartPlaceholder').css('display', 'none');
		clearInterval(triviaGame.displayNextInt);
		$('#elapsedTime').empty();
		triviaGame.numberCorrect = 0;
		triviaGame.numberIncorrect = 0;
		triviaGame.numberUnAnswered = 0;
	},
//Game Ends 
	gameFinished: function(){

		$('#restartPlaceholder').css('display', 'block');
		$('#divAnswers').hide();
		$('#gameStart').hide();

		$('#gameComplete').css('display', 'block');

		$('#gameOverCorrect span').html(triviaGame.numberCorrect);
		$('#gameOverIncorrect span').html(triviaGame.numberIncorrect);
		$('#unanswered span').html(triviaGame.numberUnAnswered);
		triviaGame.timer = 30;
	}
};



//Game begins on click of the start button 
	$('#begin').on('click', function(){

		$('div#gameStart').css('display', 'block');
		$('#btnWrapper').css('display', 'none');
		$('.questions').html(triviaGame.beginGame);

	});
//once the player hits options
	$('.answers').on('click', function(){

		triviaGame.userAnswers.push($(this).text());
		triviaGame.btnClicked = true;

	});
//once the player hits restart - calls function restart
	$('#restartPlaceholder').on('click', function(){

		triviaGame.restart();
		
	});


});