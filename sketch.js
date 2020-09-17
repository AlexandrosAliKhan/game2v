var canvasWidth = 640;
var canvasHeight = 480;

var player = 0;
var playerX = 300;
var playerY = 100;
var sprWidth = 64;
var sprHeight = 64;
var speed = 4;

var monster = 0;
var monsterX = 300;
var monsterY = 300;

var ghost = 0;
var ghostX = 100;
var ghostY = 100;

var projectile = 0;

var direction = 90;

var song;

var jumpingUp = false;
var fallingDown = false;

var counter = 0;

function createEnemy(x, y) {
    var newEnemy = createSprite(x, y);
    var attackImg = loadImage("images/enemy.png");
    newEnemy.addImage("images/enemy.png");
}

function preload() {
    playerImg = loadImage("images/cato.png");
    //playerImg = loadSpriteSheet("images/evelyn.png", 106, 162, 16);
    bgImg = loadImage("images/bedroom.png");
    monsterImg = loadImage("images/monster.png");
    ghostImg = loadImage("images/ghost.png");
    projectileImg = loadImage("images/projectile.png");
    song = loadSound("music/Blippy Trance.mp3", loaded);
    //walkAnimation = loadAnimation(playerImg);
}

function loaded() {
    song.setVolume(0.25);
    song.play();
    song.loop();
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    player = createSprite(playerX, playerY, sprWidth, sprHeight);
    player.addImage(playerImg, "images/cato.png");
    //player.addAnimation('walk', walkAnimation);
    monster = createSprite(monsterX, monsterY, sprWidth, sprHeight);
    monster.addImage(monsterImg, "images/monster.png");
    //ghost = createSprite(ghostX, ghostY, sprWidth, sprHeight);
    //ghost.addImage(ghostImg, "images/ghost.png");
    
    projectile = new Group();
    
    enemy = new Group();
    enemy.add(monster);
    //enemy.add(ghost);
    
    player.setCollider("rectangle", 0, 0, 40, 40);
    monster.setCollider("rectangle", 0, 0, 40, 40);
    //ghost.setCollider("rectangle", 0, 0, 40, 40);
}

function playerControls() {
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        player.position.x += speed;
    } if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        player.position.x -= speed; 
    } if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
        player.position.y += speed;
    } if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
        player.position.y -= speed;
    }
    if (player.position.x + sprWidth/2 > canvasWidth) {
             player.position.x = canvasWidth - sprWidth/2;
    }
    if (player.position.x < sprWidth/2) {
            player.position.x = sprWidth/2;
    }
    if (player.position.y + sprHeight/2 > canvasHeight) {
            player.position.y = canvasHeight - sprHeight/2;
    }
    if (player.position.y < sprWidth/2) {
            player.position.y = sprHeight/2;
    }
    /*if (ghost.position.x + sprWidth > canvasWidth) {
             ghost.position.x = canvasWidth - sprWidth;
    }
    if (ghost.position.x < sprWidth) {
            ghost.position.x = sprWidth;
    }
    if (ghost.position.y + sprHeight > canvasHeight) {
             ghost.position.y = canvasHeight - sprHeight;
    }
    if (ghost.position.y < sprWidth) {
            ghost.position.y = sprHeight;
    }*/
    if (keyWentDown(32)) {
        jumpingUp = true;
    }
    if (jumpingUp) {
        if (counter < 60) {
            player.position.y -= 2;
            counter++;
        } else {
            jumpingUp = false;
            fallingDown = true;
        }
    }
    if (fallingDown) {
        if (counter > 0) {
            player.position.y += 2;
            counter--;
        } else {
            fallingDown = false;
        }
    }
}

function enemyMovements() {
    direction += 2;
    monster.setSpeed(3, direction);
}

function collisions() {
    enemy.overlap(projectile, destroyOther);
    player.collide(enemy);
}

function destroyOther(destroyed) {
    destroyed.remove();
    projectile.remove();
}

function gameOver() {
    alert("GAME OVER");
    window.location.reload();
    clearInterval(interval);
}

function mousePressed() {
    projectile = createSprite(player.position.x, player.position.y);
    projectile.addImage(projectileImg);
    projectile.attractionPoint(10+speed, mouseX, mouseY);
    projectile.setCollider("rectangle", 0, 0, 40, 40);
}

function draw() {
    background(bgImg);
    playerControls();
    collisions();
    enemyMovements();
    //ghost.attractionPoint(0.2, player.position.x, player.position.y);
    //ghost.maxSpeed = 4;
    
    drawSprites();
}

setInterval(draw, 10);