/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var roundScore, currentPlayer, compareScore, gameState;
init();

document.querySelector('.btn-roll').addEventListener('click', function(){
	if(gameState){
		var dice = Math.floor(Math.random() * 6) + 1;
		var dicedom = document.querySelector('.dice');
		dicedom.style.display = 'block';
		dicedom.src = 'dice-' + dice + '.png';
		if(dice !== 1){
			roundScore += dice;
			document.querySelector('#current-' + currentPlayer).textContent = roundScore;
		}
		else{
			nextPlayer();
		}	
	}
});

document.querySelector('.btn-hold').addEventListener('click', function(){
	if(gameState){
		compareScore[currentPlayer] += roundScore;
		document.querySelector('#score-' + currentPlayer).textContent = compareScore[currentPlayer];
		if(compareScore[currentPlayer] >= 100){
			document.querySelector('#name-' + currentPlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none'
			document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
			gameState = false;
		}
		else{
			nextPlayer();
		}
	}
});

function nextPlayer(){
	currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
	roundScore = 0;
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
	gameState = true;
	currentPlayer = 0;
	roundScore = 0;
	compareScore = [0, 0];
	document.querySelector('.dice').style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1'
	document.getElementById('name-1').textContent = 'Player 2'
	document.querySelector('.player-0-panel').classList.remove ('Winner!');
	document.querySelector('.player-1-panel').classList.remove ('Winner!');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}