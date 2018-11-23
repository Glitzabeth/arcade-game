// modes variables
let modal = document.querySelector(".start-game");
let overlay = document.querySelector(".overlay");
let gameover = document.querySelector(".game-over");
let winReport = document.querySelector(".winner");

// playerpoints and chances
let playerPoints = 0;
let playerLives = 3;

//this function starts the game
function startGame(){
    modal.classList.add("hide");
    overlay.classList.add("hide");

    // Initial figures
    playerPoints = 0;
}

// run when player looses all lives
function gameOver(){
    overlay.classList.add("show");
    gameover.classList.add("show");
}

//  function to reset the game
function resetGame(){
    window.location.reload(true);
}

// funtion runs to check lives 
function chances(){
    if (alllives.length === 0){    
        gameOver()
    }
}

// when player gets all 5 keys and wins game function
function youWin(){
    overlay.classList.add("show");
    winReport.classList.add("show");
}

// Enemy class
let Enemy = function(x, y, speed = 1) {
    // Variables applied to each of our instances
    this.x = x;
    this.y = y;
    this.location = ( x, y);
    this.speed = speed;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
   this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.initialize = function(){
    if (playerPoints != 0){ //unless game over
    this.speed = Math.random() * player.level * 100 + 100; //choose initial speed at random
    }
    else{
        this.speed = 0;
    }
    this.x = -100;
    this.y = (Math.floor(Math.random() * 3 ) + 1) * 83 - 30; //choose random row
};

// To Update the enemy's position, required method for game-Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter copied-------------
    this.x += 100 * this.speed * dt;
    
    // collison detection
    if (parseInt(this.x)+ 100 >= playerX && parseInt(this.x) <= playerX + 50 && this.y === playerY){
        console.log("a collision just occured your player diessss");  
        player.reset();
        alllives.pop();
        playerLives -= 1
        if (playerPoints >= 50){
            playerPoints -= 50;
        }
    }
    chances();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// player class
let Player = function (x, y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-princess-girl.png';
};
let playerX
let playerY

Player.prototype.update = function(){
    playerX = this.x;
    playerY = this.y;
}

// this draws player on canvas
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// method to handleInput() 
Player.prototype.handleInput = function(KeyPressed){
    if (KeyPressed === 'left' && this.x > 33){
        this.x -= 100;
    }
    else if (KeyPressed === 'up'&& this.y > 18){
        this.y -= 80;
    }
    else if (KeyPressed === 'right' && this.x < 400){
        this.x += 100
    }
    else if (KeyPressed === 'down' && this.y < 380){
        this.y += 80
    }
};
// to reset player to original position
Player.prototype.reset = function(){
    this.x = 200;
    this.y = 380;
}

// Lives class
let Lives = function(x, y){
    this.x = x;
    this.y = y
    this.sprite = 'images/Heart.png';
};
// render method for Lives class
Lives.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 28, 42);
}

// Key class
let Key = function(x, y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/Key.png';
}
// draws keys on the canvas
Key.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 90, 130);
}


// class to figure out when a player wins
let winLay = function(x, y){
    this.x = x;
    this.y = y
}

let winLayX
let winLayY
winLay.prototype.update = function(){
    winLayX = this.x;
    winLayY = this.y;

    if((-Math.abs(winLayY)) == playerY && this.x == playerX){
        allKeys.push(new Key(winLayX, winLayY));
        playerPoints += 100;
        player.reset();
    }
    if (allKeys.length == 5){
        console.log("You Deserve Some Accolades");
        youWin();
    } 
}

// class to determine player points
let Points = function(x, y, score){
    this.x = x;
    this.y = y;
    this.score = "points: "+ playerPoints
}
Points.prototype.render = function(){
    ctx.font = '22px serif';
    ctx.fillText(this.score, this.x, this.y);
}
Points.prototype.update = function(){
    this.score = "points: "+ playerPoints
}

// possible X-axis positions on board
let columns = [ -5, -100, -200, -300, -400];
let enemyX;

// possible Y-axis positions on board
let rows = [ 60, 140, 220];
let enemyY;

let enemySpeed;

// randomly pick locations for bugs
setInterval(function instances(){
    enemyX = columns[Math.floor(Math.random() * 5)],
    enemyY = rows[Math.floor(Math.random() * 3)],
    enemySpeed = Math.floor(Math.random() * 15),
    allEnemies.push(new Enemy(enemyX, enemyY, enemySpeed)); 
},700)



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [ new Enemy(-8, 80, 3), new Enemy(0, 160, 10), new Enemy(-5, 300, 15)];

// variable called player
let player = new Player( 200, 380);

// instantiate lives
let alllives = [ new Lives(20, 540), new Lives(50, 540), new Lives(80, 540)];

let allKeys = [ ];

// instantiate winning blocks
let winningblocks = [ new winLay(0, 20), new winLay(100, 20), new winLay(200, 20), new winLay(300, 20), new winLay(400, 20)];

let points = new Points(350, 570)
 

// This listens for key press 
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
