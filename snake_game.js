// Hole das Canvas-Element und den Kontext zum Zeichnen
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Variablen für das Spiel
const boxSize = 20; // Größe eines Blocks (Snake-Teil und Essen)
let snake = [{ x: 9 * boxSize, y: 9 * boxSize }]; // Anfangsposition der Snake
let direction = 'RIGHT'; // Anfangsrichtung der Snake
let food = { // Startposition des Essens
    x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
    y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize
};
let score = 0; // Spielstand

// Funktion, um das Essen und die Snake zu zeichnen
function drawGame() {
    // Leere den Canvas für das nächste Frame
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Zeichne die Snake
    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? 'lime' : 'green'; // Kopf in einer anderen Farbe
        ctx.fillRect(part.x, part.y, boxSize, boxSize);
    });

    // Zeichne das Essen
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, boxSize, boxSize);

    // Zeichne den aktuellen Spielstand
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

// Funktion, um die Position der Snake zu aktualisieren
function updateSnake() {
    const head = { ...snake[0] }; // Kopiere den Kopf der Snake

    // Bestimme die neue Position basierend auf der Richtung
    switch (direction) {
        case 'UP':
            head.y -= boxSize;
            break;
        case 'DOWN':
            head.y += boxSize;
            break;
        case 'LEFT':
            head.x -= boxSize;
            break;
        case 'RIGHT':
            head.x += boxSize;
            break;
    }

    // Überprüfe, ob die Snake das Essen erreicht hat
    if (head.x === food.x && head.y === food.y) {
        score += 1; // Erhöhe den Spielstand
        // Generiere neues Essen
        food = {
            x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
            y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize
        };
    } else {
        // Entferne das letzte Teil der Snake, wenn sie kein Essen frisst
        snake.pop();
    }

    // Füge die neue Kopfposition der Snake hinzu
    snake.unshift(head);

    // Überprüfe, ob die Snake gegen die Wand oder sich selbst stößt
    if (
        head.x < 0 || head.y < 0 ||
        head.x >= canvas.width || head.y >= canvas.height ||
        snake.slice(1).some(part => part.x === head.x && part.y === head.y)
    ) {
        clearInterval(game); // Stoppe das Spiel
        alert('Game Over! Your score: ' + score);
        location.reload(); // Lade die Seite neu
    }
}

// Event-Listener für die Steuerung
document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'DOWN') direction = 'UP';
            break;
        case 'ArrowDown':
            if (direction !== 'UP') direction = 'DOWN';
            break;
        case 'ArrowLeft':
            if (direction !== 'RIGHT') direction = 'LEFT';
            break;
        case 'ArrowRight':
            if (direction !== 'LEFT') direction = 'RIGHT';
            break;
    }
});

// Hauptspiel-Loop
function gameLoop() {
    updateSnake(); // Aktualisiere die Snake-Position
    drawGame();   // Zeichne das Spiel
}

// Starte das Spiel
const game = setInterval(gameLoop, 100); // Aktualisiere das Spiel alle 100ms
