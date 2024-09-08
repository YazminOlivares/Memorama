const cardsArray = [
  { name: 'cat', img: 'cat.webp?text=Cat' },
  { name: 'dog', img: 'dog.webp?text=Dog' },
  { name: 'fox', img: 'fox.webp?text=Fox' },
  { name: 'lion', img: 'lion.webp?text=Lion' },
  { name: 'cat', img: 'cat.webp?text=Cat' },
  { name: 'dog', img: 'dog.webp?text=Dog' },
  { name: 'fox', img: 'fox.webp?text=Fox' },
  { name: 'lion', img: 'lion.webp?text=Lion' },
];

const memoryGame = document.getElementById('memoryGame');
let matchedPairs = 0; // Variable para contar pares encontrados
const totalPairs = cardsArray.length / 2; // Número total de pares a encontrar

// Mezclar las tarjetas
const shuffledCards = shuffle(cardsArray);

shuffledCards.forEach(card => {
  const cardElement = document.createElement('div');
  cardElement.classList.add('memory-card');
  cardElement.innerHTML = `
    <img src="${card.img}" alt="${card.name}" class="front-face">
    <img src="card-back.webp" alt="Back" class="back-face">
  `;
  memoryGame.appendChild(cardElement);

  cardElement.addEventListener('click', flipCard);
});

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.querySelector('.front-face').src === secondCard.querySelector('.front-face').src;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  matchedPairs++;
  checkWinCondition();
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function checkWinCondition() {
  if (matchedPairs === totalPairs) {
    setTimeout(() => {
      alert('¡Felicidades! Has encontrado todas las parejas.');
    }, 500);
  }
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Reiniciar el juego
document.getElementById('reset').addEventListener('click', () => {
  memoryGame.innerHTML = '';
  const shuffled = shuffle(cardsArray);
  shuffled.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('memory-card');
    cardElement.innerHTML = `
      <img src="${card.img}" alt="${card.name}" class="front-face">
      <img src="card-back.webp" alt="Back" class="back-face">
    `;
    memoryGame.appendChild(cardElement);
    cardElement.addEventListener('click', flipCard);
  });
  matchedPairs = 0; // Reiniciar el contador de pares encontrados
  resetBoard();
});