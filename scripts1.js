 const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let time= document.getElementById('timer'); 
let flipSound = new Audio()
flipSound.src = 'click-47609.mp3'

let winFilp = new Audio() 
winFilp.src = 'announcement-sound-4-21464.mp3'

let resultSound = new Audio()
resultSound.src = "tadaa-47995.mp3"

let mainCard = Array.from(cards)
let winCard = [];
let finish = document.querySelector('#finish')
let cry = document.querySelector('#cry')


let timer= 0
let interval = 0

let countDown= ()=>{
  if(timer == 100 || winCard.length == cards.length) { 
        clearInterval(interval);
        cards.forEach(card => card.removeEventListener('click',  flipCard));
        result();
  }
  else {
    timer++;
    time.textContent= timer
  }
}





window.addEventListener('DOMContentLoaded', (event) => {
  setInterval(countDown, 1000); 
});



function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  flipSound.play()

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  winFilp.play()

  winCard.push(firstCard,secondCard)
  console.log(winCard)

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 500);


}

function result() {
if (winCard.length == cards.length)  {
  finish.style.display = "block";
  resultSound.play()
}

else {
  cry.style.display = "block"
}
}



function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));