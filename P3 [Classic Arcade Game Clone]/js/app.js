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

const grid = new Grid(101, 83, 6, 5, 18);

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

        if (areIntersecting(this, player)) {
            player.setPosition(2 * grid.x, 5 * grid.y);
            countLives();
        }
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}




// Now write your own player class
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
                    countVictory();
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
// This class requires an update(), render() and
// a handleInput() method.

function countVictory() {
    const scoreBoard = document.querySelector('#score');
    victory++;
    scoreBoard.innerHTML = `${victory}`;

    if (victory === 5) {
        setTimeout(function () {
            //Opening the popup modal when we click play again
            modal.style.display = 'block';

            //Closing the popup modal when we click play again  -- NOT WORKING ON ENTER!!
            document.getElementById('button').addEventListener('click', function closeModal() {
                document.querySelector('#modalContainer').style.display = 'none';
                reset();
                
            });
            
        }, 100);
        
    }
}



function countLives() {
    const livesBoard = document.querySelector('#lives');
    
    if (live > 1) {
        live--;
        livesBoard.innerHTML = `${live}`;
    } else {
        setTimeout(function () {
            alert("YOU LOSE!");
            reset();
            
            
        }, 100);
    }
    
}


function reset() {
    const scoreBoard = document.querySelector('#score');
    const livesBoard = document.querySelector('#lives');
    
    victory = 0;
    live = 3;
    scoreBoard.innerHTML = `${victory}`;
    livesBoard.innerHTML = `${live}`;
    player.setPosition(2 * grid.x, 5 * grid.y);
}



// Now instantiate your objects.
const enemy1 = new Enemy(20, 1 * grid.y, 50);
const enemy2 = new Enemy(20, 2 * grid.y, 10);
const enemy3 = new Enemy(20, 3 * grid.y, 15);
// Place all enemy objects in an array called allEnemies
const allEnemies = [enemy1, enemy2, enemy3];
// Place the player object in a variable called player
const player = new Player(2 * grid.x, 5 * grid.y);
const modal = document.querySelector('#modalContainer');
let victory = 0;
let live = 3;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/*function areIntersecting(o1, o2) {
    


}*/


function areIntersecting(o1, o2) {
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


