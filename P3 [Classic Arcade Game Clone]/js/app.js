
//Game functions
class Game {
    constructor() {
        this.modal = document.querySelector('#modalContainer');
        this.scoreBoard = document.querySelector('#score');
        this.livesBoard = document.querySelector('#lives');
        this.victory = 0;
        this.lives = 3;

        // This listens for key presses and sends the keys to your
        // Player.handleInput() method. You don't need to modify this.
        document.addEventListener('keyup', function (e) {
            if (game.victory < 5) {
                const allowedKeys = {
                    37: 'left',
                    38: 'up',
                    39: 'right',
                    40: 'down',
                };

                player.handleInput(allowedKeys[e.keyCode]);
            }
        });
    }
    //Score counter and winning condition
    countVictory() {
        this.victory++;
        this.scoreBoard.innerHTML = this.victory;
    
        if (this.victory === 5) {
            setTimeout(function () {
                //Popup modal when win
                game.modal.style.display = 'block';
    
                //Closing the popup modal when we click play again or hit enter.
                document.getElementById('button').addEventListener('click', game.closeModalAndReset);
                document.addEventListener('keypress', game.closeModalAndReset);    
            }, 100);
        }
    }

    closeModalAndReset(event) {
        if (event.type === 'click' || (event.type === 'keypress' && event.key === 'Enter')) {
            document.querySelector('#modalContainer').style.display = 'none';
            game.reset();
        }
    }
        //Lives counter -->
    countLives() {
        if (this.lives > 1) {
            this.lives--;
            this.livesBoard.innerHTML = this.lives;
        } else {
            setTimeout(function () {
                alert("YOU LOSE!");
                //TODO -- popup
                game.reset();
            }, 100);
        }
    }
    //--> because vehicle-player collision resets the game only after lives are lost!
    reset() {
        this.victory = 0;
        this.lives = 3;
        this.scoreBoard.innerHTML = this.victory;
        this.livesBoard.innerHTML = this.lives;

        player.setPosition(2 * grid.x, 5 * grid.y);
    }
    // Check collision 
    areIntersecting(o1, o2) {
        const o1coordonates = {
            x0: o1.x,
            x1: o1.x + grid.x,
            y0: o1.y,
            y1: o1.y + grid.y
        }

        const o2coordonates = {
            x0: o2.x,
            x1: o2.x + grid.x,
            y0: o2.y,
            y1: o2.y + grid.y
        }

        return o1coordonates.x0 < o2coordonates.x1 &&
            o1coordonates.x1 > o2coordonates.x0 &&
            o1coordonates.y0 < o2coordonates.y1 &&
            o1coordonates.y1 > o2coordonates.y0;
    }
}

// Extracted the hardcoded grid variables into a globally accessible object 
// in order to re-use them across the application (to move our character across the grid)
class Grid {
    constructor(x, y, rows, columns, verticalOffset) {
        this.x = x;
        this.y = y;
        this.offset = verticalOffset;
        this.playableArea = {
            xi: 0,
            xf: this.x * columns,
            yi: 0,
            yf: this.y * rows
        }
    }

    isWithinBounds(obj) {
        if (obj.x < this.playableArea.xi) {
            return false;
        }

        if (obj.y + this.offset < this.playableArea.yi) {
            return false;
        }

        if (obj.x >= this.playableArea.xf) {
            return false;
        }

        if (obj.y + this.offset >= this.playableArea.yf) {
            return false;
        }

        return true;
    }
}

// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this.x = x;
        this.y = y - grid.offset;
        this.speed = speed;
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x = this.x + this.speed * dt;

        if (this.x > ctx.canvas.clientWidth) {
            this.x = -50;
            this.speed = Math.max(Math.random() * 100, 25);
        }

        if (game.areIntersecting(this, player)) {
            player.setPosition(2 * grid.x, 5 * grid.y);
            game.countLives();
        }
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.setPosition(x, y),
            this.sprite = 'images/char-horn-girl.png'
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y - grid.offset;
    }

    update(dt) {

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(direction) {
        switch (direction) {
            case 'up':
                this.y = this.y - grid.y;
                if (!grid.isWithinBounds(this)) {
                    this.y = this.y + grid.y;
                    game.countVictory();
                    this.setPosition(2 * grid.x, 5 * grid.y);
                }
                break;

            case 'down':
                this.y = this.y + grid.y;
                if (!grid.isWithinBounds(this)) {
                    this.y = this.y - grid.y;
                }
                break;

            case 'left':
                this.x = this.x - grid.x;
                if (!grid.isWithinBounds(this)) {
                    this.x = this.x + grid.x;
                }
                break;

            case 'right':
                this.x = this.x + grid.x;
                if (!grid.isWithinBounds(this)) {
                    this.x = this.x - grid.x;
                }
                break;
        }
    }
}


const grid = new Grid(101, 83, 6, 5, 18);
const game = new Game();
// Now instantiate your objects.
const enemy1 = new Enemy(20, 1 * grid.y, 50);
const enemy2 = new Enemy(20, 2 * grid.y, 10);
const enemy3 = new Enemy(20, 3 * grid.y, 15);
// Place all enemy objects in an array called allEnemies
const allEnemies = [enemy1, enemy2, enemy3];
// Place the player object in a variable called player
const player = new Player(2 * grid.x, 5 * grid.y);