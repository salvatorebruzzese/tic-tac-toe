const cells = document.querySelectorAll('span');
const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
const winningLength = 3;

let stateArray = Array(9).fill('none'); 
let move = 0;
let redWins = 0, blueWins = 0;

function updateCell(index) {
    if (stateArray[index] === 'none') {
        if (move % 2 === 0) {
            cells[index].style.backgroundColor = 'rgb(255, 0, 0)';
            stateArray[index] = 'red';
        } else {
            cells[index].style.backgroundColor = 'rgb(0, 0, 255)';
            stateArray[index] = 'blue';
        }
        move++;
    }
}

function checkWin() {
    let continuityRed = false;
    let continuityBlue = false;

    for (let i = 0; i < winningCombinations.length; i++) {
        if (stateArray[winningCombinations[i][0]] === 'red' &&
            stateArray[winningCombinations[i][1]] === 'red' &&
            stateArray[winningCombinations[i][2]] === 'red'
        ) continuityRed = true;
        if (stateArray[winningCombinations[i][0]] === 'blue' &&
            stateArray[winningCombinations[i][1]] === 'blue' &&
            stateArray[winningCombinations[i][2]] === 'blue'
        ) continuityBlue = true;
    }

    if (continuityRed === true) return 'red';
    else if (continuityBlue === true) return 'blue';
    else if (move === 9) return 'tie';
    else return 'none';
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        updateCell(index);

        let winner = checkWin();
        if (winner === 'red') {redWins++; reset();}
        else if (winner === 'blue') {blueWins++; reset();}
        else if (winner === 'tie') {reset();}
    });
});

function reset() {
    move = 0;
    stateArray.fill('none');
    cells.forEach((cell) => {
        cell.style.backgroundColor = '';
    })
}