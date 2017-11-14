'use strict';

//variables
const mainCard = document.getElementById('main-card');
const topNum = document.getElementById('top-number');
const bottomNum = document.getElementById('bottom-number');
const answer = document.getElementById('answer');
const symbol = document.getElementById('symbol');
const divideCard = document.getElementById('divide-card');
const dividend = document.getElementById('dividend');
const divisor = document.getElementById('divisor');
const divideSymbol = document.getElementById('divide-symbol');
const divideAnswer = document.getElementById('divide-answer');
const divideBtn = document.getElementById('divide-submit');
const score = document.getElementById('score');
const gameBtn = document.getElementById('submit');
const formBtn = document.getElementById('form-submit');
let currentScore = 0;
const nameInput = document.getElementById('name');
const name = document.getElementById('player');
const emoji = document.getElementById('emoji');
const feedback = document.getElementById('feedback');
const form = document.getElementById('sign-in');
const overlay = document.getElementById('overlay');
const buttons = document.getElementsByTagName('button');
let correct;
let operation;

//use form data to create flash cards

function createMainCard() {
	mainCard.style.zIndex = '20';
	divideCard.style.zIndex = '-20';
	let firstNum = Math.floor((Math.random() * 9) + 1);
	let secondNum = Math.floor((Math.random() * 9) + 1);
	if(symbol.innerText === "-") {
		if(secondNum > firstNum) {
			topNum.innerHTML = secondNum;
			bottomNum.innerHTML = firstNum;
		} else {
			topNum.innerHTML = firstNum;
			bottomNum.innerHTML = secondNum;
		} 
	} else {
		topNum.innerHTML = firstNum;
		bottomNum.innerHTML = secondNum;
	}
}

function createDivideCard() {
	mainCard.style.zIndex = '-20';
	divideCard.style.zIndex = '20';
	let firstNum = Math.floor((Math.random() * 89) + 1);
	let secondNum = Math.floor((Math.random() * 9) + 1);
	if(secondNum > firstNum) {
		dividend.innerHTML = secondNum;
		divisor.innerHTML = firstNum;
	} else {
		dividend.innerHTML = firstNum;
		divisor.innerHTML = secondNum;
	}

	if(parseInt(dividend.innerHTML) % parseInt(divisor.innerHTML) > 0) {
		createDivideCard();
	}
}

//operation functions

function add() {
	correct = parseInt(topNum.innerText) + parseInt(bottomNum.innerText);
}

function subtract() {
	correct = parseInt(topNum.innerText) - parseInt(bottomNum.innerText);
}

function multiply() {
	correct = parseInt(topNum.innerText) * parseInt(bottomNum.innerText);
}

function divide() {
	correct = parseInt(dividend.innerText) / parseInt(divisor.innerText);
}

//create a response for after an attempt is made.

function response() {
	let attempt = parseInt(answer.value);
	if (attempt === correct) {
		currentScore += 1;
		score.innerHTML = currentScore;
		emoji.innerHTML = '<img class="emoji" src="images/happy_emoji.png" alt="A happy emoji">';
		feedback.innerHTML = 'Great Job!! Keep up the Good Work!!';
		feedback.innerHTML += '<button id="next">Next Question!</button>';
		nextQuestion();
	} else {
		currentScore -= 1;
		score.innerHTML = currentScore;
		emoji.innerHTML = '<img class="emoji" src="images/sad_emoji.png" alt="A sad emoji">';
		feedback.innerHTML = '<span>Whoops! The correct answer to ' + topNum.innerText + symbol.innerHTML + bottomNum.innerText + ' is ' + correct +' . Keep going!</span>';
		feedback.innerHTML += '<button id="next">Next Question!</button>';
		nextQuestion();
	}
	
}

function divideResponse() {
	let attempt = parseInt(divideAnswer.value);
	if (attempt === correct) {
		currentScore += 1;
		score.innerHTML = currentScore;
		emoji.innerHTML = '<img class="emoji" src="images/happy_emoji.png" alt="A happy emoji">';
		feedback.innerHTML = 'Great Job!! Keep up the Good Work!!';
		feedback.innerHTML += '<button id="next">Next Question!</button>';
		
	} else {
		currentScore -= 1;
		score.innerHTML = currentScore;
		emoji.innerHTML = '<img class="emoji" src="images/sad_emoji.png" alt="A sad emoji">';
		feedback.innerHTML = '<span>Whoops! The correct answer to ' + dividend.innerText + ' ➗ ' + divisor.innerText + ' is ' + correct +' . Keep going!</span>';
		feedback.innerHTML += '<button id="next">Next Question!</button>';
	}
	nextQuestion();
}

//Button listeners

formBtn.addEventListener('click', function() {
	name.innerText = nameInput.value;
	score.innerHTML = currentScore;
	let radioBtn = document.querySelector('input[name="operation"]:checked');
	operation = radioBtn.getAttribute('id');
	if (operation === "addition") {
		symbol.innerHTML = '+';
		createMainCard();
	} else if (operation === "subtraction") {
		symbol.innerHTML = '-';
		createMainCard();
	} else if (operation === "multiplication") {
		symbol.innerHTML = 'X';
		createMainCard();
	}  else {
		createDivideCard();
	}
	form.classList.add('hide');
	overlay.classList.add('hide');
	answer.focus();
	divideAnswer.focus();
	return;
});


gameBtn.addEventListener('click', function() {
		if(symbol.innerText === "+") {
			add();
		} else if(symbol.innerText === "-") {
			subtract();
		} else if(symbol.innerText === "X") {
			multiply();
		} 
		response();	
});


divideBtn.addEventListener('click', function() {
	divide();
	divideResponse();
});

function nextQuestion() {
	const nextBtn = document.getElementById('next');
	nextBtn.addEventListener('click', function() {
		if(divideCard.style.zIndex === '20') {
			createDivideCard();
			divideAnswer.value = "";
			divideAnswer.focus();
		} else {
			createMainCard();
			answer.value = "";
			answer.focus();
		}
		feedback.innerHTML = "";
		emoji.innerHTML = "";
	});
}










