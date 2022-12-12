

const userNumber = document.getElementsByClassName('user-guess')[0],
      guessButton = document.getElementsByClassName('guess-bttn')[0],
      responseEmoji = document.getElementsByClassName('emoji')[0],
      response = document.getElementsByClassName('message')[0],
      guessForm = document.getElementsByClassName('guess-form')[0];


let computerNumber,
    guessList = document.getElementsByClassName('guess-list')[0],
    guesses = [],
    guessCount = 0,
    guessCountArea = document.getElementsByClassName('total-guesses')[0];


const guessNumber = (e) => {
    e.preventDefault();
    let parsedUserNumber = parseInt(userNumber.value);
    
    if(parsedUserNumber === '' || isNaN(parsedUserNumber)){
        responseEmoji.innerHTML = `&#128533;`;
        response.innerHTML = `Have a guess?`;
    }

    else if(guesses.some(number => number === parsedUserNumber)){
        responseEmoji.innerHTML = `&#128534;`;
        response.innerHTML = `Repeated number!`;
    }
    
    else if(parsedUserNumber === computerNumber) {
        guesses.push(parsedUserNumber);
        addGuessToList(parsedUserNumber, 'winner');
        increaseGuessCount();
        endGame();
    }

    else if(parsedUserNumber > 100 || parsedUserNumber < 1) {
        responseEmoji.innerHTML = `&#128565;`;
        response.innerHTML = `Too far out.`; 
    }

    else if(parsedUserNumber - computerNumber >= -5 && parsedUserNumber - computerNumber <= -1){
        responseEmoji.innerHTML = `&#128562;`;
        response.innerHTML = `Almost, but low!`;        
        guesses.push(parsedUserNumber);
        addGuessToList(parsedUserNumber, 'low');
        increaseGuessCount();
    }

    else if(parsedUserNumber - computerNumber <= 5 && parsedUserNumber - computerNumber >= 1){
        responseEmoji.innerHTML = `&#128562;`;
        response.innerHTML = `Almost, but high!`;        
        guesses.push(parsedUserNumber);
        addGuessToList(parsedUserNumber, 'high');
        increaseGuessCount();
    }

    else if(parsedUserNumber < computerNumber) {
        responseEmoji.innerHTML = `&#129398;`;
        response.innerHTML = `Too low!`;        
        guesses.push(parsedUserNumber);
        addGuessToList(parsedUserNumber, 'low');
        increaseGuessCount();
    }

    else if(parsedUserNumber > computerNumber) {
        responseEmoji.innerHTML = `&#129397;`;
        response.innerHTML = `Too high!`;
        guesses.push(parsedUserNumber);
        addGuessToList(parsedUserNumber, 'high');
        increaseGuessCount();
    }

    userNumber.value = '';
    userNumber.focus();
}

const startGame = () => {
    userNumber.value = '';
    computerNumber = Math.ceil(Math.random() * 100);
    guessButton.innerHTML = `Guess`;
    userNumber.disabled = false;
    guessForm.addEventListener('submit', guessNumber, false);
    guessForm.removeEventListener('submit', startGame, false);
}

const endGame = () => {
    // THANOS SNAP!!!
    responseEmoji.innerHTML = `&#127942;`;
    response.innerHTML = `You Win!`;
    guessButton.innerHTML = `Play Again?`;
    userNumber.disabled = true;
    guessForm.removeEventListener('submit', guessNumber, false);
    guessForm.addEventListener('submit', startGame, false);
}

const addGuessToList = (num, status) => {
    guessList.appendChild(document.createElement('li')).className = `${status} user-guess`;
    let tempGuess = document.getElementsByClassName('user-guess');
    
    if(status  === 'low') {
        tempGuess[tempGuess.length -1].innerHTML = `${num} `;
        tempGuess[tempGuess.length -1].innerHTML += num - computerNumber >= -5 && num - computerNumber <= -1 ?
        `&#128562;` : `&#129398;`;
    } 
    
    else if(status === 'high') {
        tempGuess[tempGuess.length -1].innerHTML = `${num} `;
        tempGuess[tempGuess.length -1].innerHTML += num - computerNumber <= 5 && num - computerNumber >= 1 ?
        `&#128562;` : `&#129397;`;
    } 
    
    else if(status === 'winner') {
        tempGuess[tempGuess.length -1].innerHTML = `${num} &#127942;`;
    } 
    
    else {
        console.log('Results listing error.')
    }
}

const increaseGuessCount = () => {
    guessCount++
    guessCountArea.innerHTML = `Total Guesses: ${guessCount}`;
}



window.addEventListener('load', startGame, false);