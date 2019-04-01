function reset() {
    const scoreBoard = document.querySelector('#score');
    const livesBoard = document.querySelector('#lives');
    victory = 0;
    live = 3;
    scoreBoard.innerHTML = `${victory}`;
    livesBoard.innerHTML = `${live}`;
    player.setPosition(2 * grid.x, 5 * grid.y);
}
