const images = [
    'image-1.jpg',
    'image-2.jpg',
    'image-3.jpg',
    'image-4.jpg',
    'image-5.jpg',
    'image-6.jpg',
];

// crea las fotos dobles
const cards = images.concat(images);

// crear función para barajar
function shuffle() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}
shuffle();

const gameBoard = document.getElementById('game-board');

cards.forEach((image, index) => {
    const card = document.createElement('div');
    card.className = 'memoryCard';
    card.dataset.image = image;
    card.dataset.indice = index;
    gameBoard.appendChild(card);
    card.addEventListener('click', flipcard);
});

let flippecard = []; // cartas volteadas
let matchCards = []; // cartas emparejadas

function flipcard(e) {
    const card = e.target;
    if (flippecard.length < 2 && !matchCards.includes(card)) {
        card.style.backgroundImage = "url('./asset/image/" + card.dataset.image + "')";
        flippecard.push(card);
        if (flippecard.length == 2) {
            console.log(flippecard.length);
            setTimeout(checkMatch, 500);
        }
    }
}

function resetGame() {
    // Limpiar el tablero
    gameBoard.innerHTML = "";

    // Reiniciar las variables
    flippecard = [];
    matchCards = [];

    // Barajar las cartas nuevamente
    shuffle();

    // Volver a crear las cartas
    cards.forEach((image, index) => {
        const card = document.createElement('div');
        card.className = 'memoryCard';
        card.dataset.image = image;
        card.dataset.indice = index;
        gameBoard.appendChild(card);
        card.addEventListener('click', flipcard);
    });
}

function checkMatch() {
    const [card1, card2] = flippecard;

    if (card1.dataset.image === card2.dataset.image && card1.dataset.indice != card2.dataset.indice) {
        matchCards.push(card1, card2);

        if (matchCards.length === cards.length) {
            if (confirm("¡¡Felicidades, has ganado!! ¿Quieres volver a jugar?")) {
                resetGame(); // Reiniciar el juego si el jugador acepta
            }
        }
    } else {
        card1.style.backgroundImage = "";
        card2.style.backgroundImage = "";
    }

    flippecard = [];
}