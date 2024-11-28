const board = document.getElementById('board');
const cells = [];
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];

// 创建棋盘格子
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
    cells.push(cell);
}

// 处理格子点击事件
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (gameBoard[index] === '' &&!checkWinner()) {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);

        if (checkWinner()) {
            alert(`Player ${currentPlayer} wins!`);
        } else if (gameBoard.every(cell => cell!== '')) {
            alert("It's a draw!");
        } else {
            currentPlayer = currentPlayer === 'X'? 'O' : 'X';
        }
    }
}

// 检查是否有赢家
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // 行
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // 列
        [0, 4, 8], [2, 4, 6] // 对角线
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}

// 重置游戏
resetBtn.addEventListener('click', resetGame);

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
}
