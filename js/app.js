'use strict';

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
let correct;
let operation;
//use form data to create flash card

function createMainCard() {
	mainCard.style.zIndex = '20';
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

// function createDivideCard() {
// 	divideCard.style.zIndex = '20';
// 	let firstNum = Math.floor((Math.random() * 9) + 1);
// 	let secondNum = Math.floor((Math.random() * 9) + 1);
// 	if(secondNum > firstNum) {
// 		dividend.innerText = secondNum;
// 		divisor.innerText = firstNum;
// 	} else {
// 		dividend.innerText = firstNum;
// 		divisor.innerText = secondNum;
// 	}
// }

formBtn.addEventListener('click', function() {
	name.innerText = nameInput.value;
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
	} 
	form.classList.add('hide');
	overlay.classList.add('hide');
	answer.focus();
})

//create a response for after an attempt is made.

function response() {
	let attempt = parseInt(answer.value);
	if (attempt === correct) {
		currentScore += 1;
		score.innerHTML = currentScore;
		emoji.innerHTML = '<img class="emoji" src="images/happy_emoji.png" alt="A happy emoji">';
		feedback.innerHTML = 'Great Job!! Keep up the Good Work!!';
		createMainCard();
		answer.value = "";
		answer.focus();
	} else {
		currentScore -= 1;
		score.innerHTML = currentScore;
		emoji.innerHTML = '<img class="emoji" src="images/sad_emoji.png" alt="A sad emoji">';
		feedback.innerHTML = '<span>Whoops! The correct answer to ' + topNum.innerText + symbol.innerHTML + bottomNum.innerText + ' is ' + correct +' . Keep going!</span>';
		createMainCard();
		answer.value = "";	
		answer.focus();
	}
}

function add() {
	correct = parseInt(topNum.innerText) + parseInt(bottomNum.innerText);
}

function subtract() {
	correct = parseInt(topNum.innerText) - parseInt(bottomNum.innerText);
}

function multiply() {
	correct = parseInt(topNum.innerText) * parseInt(bottomNum.innerText);
}

// function divide() {
// 	correct = parseInt(topNum.innerText) / parseInt(bottomNum.innerText);
// }

gameBtn.addEventListener('click', function() {
	if(symbol.innerText === "+") {
		add();
	} else if(symbol.innerText === "-") {
		subtract();
	} else if(symbol.innerText === "X") {
		multiply();
	}
	 // else {
	// 	divide();
	// }
	response();	
});
