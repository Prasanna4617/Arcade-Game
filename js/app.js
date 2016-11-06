//Gems class
var Gem = function(){
    this.x = 15;
    this.y = 100;
    this.sprite = 'images/Gem_Blue_2.png';
};
//Draw gem in the canvas
Gem.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
 };
Gem.prototype.update = function(){
    this.checkCollisions();
};

//Checking player-gem collision
Gem.prototype.checkCollisions = function(){
    if ( (this.x + 30 >= player.x) && (this.x <= player.x + 30) && (this.y + 30 >= player.y) && (this.y <= player.y + 30) ){
        this.x= 2000;
        this.y = 2000;
        player.score+=50;
    }
};


// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers
    this.x = this.x + this.speed * dt;
    if (this.x > 500) {
         // Initial enemy x-axis position
         this.x = -60;
         this.randomSpeed();
     }
     this.checkCollisions();

};

Enemy.prototype.randomSpeed = function() {
    this.speed = Math.floor(Math.random() * 5 + 1) * 100;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var allEnemies = [];
for( var i= 0; i<3;i++){
    var EnemySpeed = Math.floor(Math.random()*5+1)*100;
    allEnemies.push(new Enemy(-50,60+85*i,EnemySpeed));
}
// Check Enemy-player collision
// Place all enemy objects in an array called allEnemies
Enemy.prototype.checkCollisions = function(){
    for(var i=0; i< allEnemies.length; i++){
        if ( (allEnemies[i].x + 50 >= player.x) && (allEnemies[i].x <= player.x + 50) && (allEnemies[i].y + 50 >= player.y) && (allEnemies[i].y <= player.y + 50) ) {
            player.resetPlayer();
            player.lives--;
        }
    }
};

//Player Class
var Player = function(){
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
    this.score= 0;
    this.lives = 3;
};
Player.prototype.resetPlayer = function() {
    this.x = 200;
    this.y = 400;
};
//Update player position
Player.prototype.update = function(){
    if(this.y === 0){
        this.resetPlayer();
    }
};

//Draw Player on the canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
    ctx.drawImage(Resources.get('images/Heart_35.png'),410,60);
};

//Handling the player's position based on keypressed
Player.prototype.handleInput = function(keyPressed) {
    if(keyPressed === 'left' && this.x > 0){
        this.x -= 100;
    }

    if(keyPressed === 'right' && this.x < 400){
        this.x += 100;
    }
    if(keyPressed === 'up' && this.y > 0) {
        this.y -= 50;
    }
    if(keyPressed === 'down' && this.y < 400){
        this.y += 50;
    }
    if(this.y === 0){
        this.score += 50;
    }
};
//Update player Score
Player.prototype.Score = function(){
 ctx.font = "30px Helvetica";
 ctx.fillStyle = "yellow";
 ctx.fillText(("Score:"+" "+this.score), 25,100);
};

//update player lives
Player.prototype.Lives = function(){
   ctx.font = "25px Helvetica";
    ctx.fillStyle = "yellow";
    ctx.fillText(("X"+" "+this.lives), 450,100); 
};


// Now instantiate your objects.
var player = new Player();
var gem = new Gem();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
