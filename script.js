/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, dice1, dice2, gamePlay, lastDice, winningScore;

function initialize() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlay = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.getElementById('name-0').textContent = 'Towfiq';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

initialize();

//dice = Math.floor(Math.random() * 6) + 1;
//console.log(dice);

//document.querySelector('#current-'+ activePlayer).textContent = dice;
//document.querySelector('#current-'+ activePlayer).innerHTML = '<em>' + dice + '</em>';

//var x = document.querySelector('#score-0').textContent;
//console.log(x);





// function btn() {
// statement

// }
//btn();


//document.querySelector('.btn-roll').addEventListener('click',btn);
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlay) {
        //random dice  
        dice1 = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;

        //display dice result
        // var diceDOM = document.querySelector('.dice');
        // diceDOM.style.display = 'block';
        // diceDOM.src = 'dice-' + dice + '.png';
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        // update round score if the rolled number was not a 1
        /*if (dice === 6 && lastDice === 6) {
            // player looses score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        }
        else if (dice !== 1) {
            //add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //next player
            // activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
            // roundScore = 0 ;

            // document.getElementById('current-0').textContent = '0';
            // document.getElementById('current-1').textContent = '0';

            // //document.querySelector('.player-0-panel').classList.remove('active');
            // //document.querySelector('.player-1-panel').classList.add('active');

            // document.querySelector('.player-0-panel').classList.toggle('active');
            // document.querySelector('.player-1-panel').classList.toggle('active');

            // document.querySelector('.dice').style.display = 'none';
            nextPlayer();
        }*/

        if (dice1 !== 1 && dice2 !== 1) {
            //add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }

    }

});


document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlay) {
        // add current score to global score
        scores[activePlayer] += roundScore;

        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won the game

        var input = document.querySelector('.final-score').value;
        !input ? winningScore = 100 : winningScore = input;
        if (scores[activePlayer] >= winningScore) {
            var y = document.querySelector('#name-' + activePlayer).textContent;
            document.querySelector('#name-' + activePlayer).textContent = 'Winner! ' + y;
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlay = false;
        } else {
            //next player
            nextPlayer();
        }
        lastDice = dice;
    }
});


function nextPlayer() {
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';


}

document.querySelector('.btn-new').addEventListener('click', initialize);