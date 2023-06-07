// Definição do tamanho do tabuleiro
const rows = 20;
const cols = 20;

// Criação do tabuleiro
let board = createBoard(rows, cols);

// Função para criar o tabuleiro
function createBoard(rows, cols) {
    let board = [];
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i][j] = false;
        }
    }
    return board;
}

// Função para desenhar o tabuleiro na página
function drawBoard() {
    const boardContainer = document.getElementById('board-container');
    boardContainer.innerHTML = '';

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.style.backgroundColor = board[i][j] ? '#000' : '#ddd';

            // Adiciona um listener de clique em cada célula
            cell.addEventListener('click', toggleCellState);

            boardContainer.appendChild(cell);
        }
    }
}

// Função para alternar o estado de uma célula
function toggleCellState(event) {
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;
    board[row][col] = !board[row][col];
    drawBoard();
}

// Função para atualizar o estado do tabuleiro a cada geração
function updateBoard() {
    const newBoard = createBoard(rows, cols);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const neighbors = countNeighbors(i, j);

            if (board[i][j]) {
                if (neighbors === 2 || neighbors === 3) {
                    newBoard[i][j] = true;
                }
            } else {
                if (neighbors === 3) {
                    newBoard[i][j] = true;
                }
            }
        }
    }

    board = newBoard;
    drawBoard();
}

// Função para contar o número de vizinhos vivos de uma célula
function countNeighbors(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                if (board[newRow][newCol] && !(i === 0 && j === 0)) {
                    count++;
                }
            }
        }
    }
    return count;
}

// Inicia o jogo da vida
function startGame() {
    setInterval(updateBoard, 1000);
}