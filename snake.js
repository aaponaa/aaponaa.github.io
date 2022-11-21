let candySound;
let gameoversSound;


function preload() {
  pixel = loadFont('assets/PressStart2P-Regular.ttf');
  snakeSprite = loadImage('img/snakesprite.png');
  candySprite = loadImage('img/candysprite.png');

  soundFormats('mp3', 'ogg');
  candySound = loadSound('sound/candy.mp3');
  gameoversSound = loadSound('sound/gameover.mp3');
}

function setup() {

  createCanvas(1200, 1200);
  frameRate(6);   

  textFont(pixel);
  player = new Snake(200,200,0,0); 
  candy = new Candy();  
}

function draw() {
  
  if(!player.gameOver){
    background("#f6fceb");
    
    fill("#44af92");          //Arène 
    square(100,100,1000);
    
    fill("#d6dfc2");
    square(200,200,800);
    
    candy.show();
    player.move();

  
  }else{
    player.gameOver = true;
    textSize(96);
    text("Game Over!", 160, 460);
    textSize(48);
    text("Press Enter...", 300, 540);
  }
  
  textSize(24);
  text("Score:"+str(player.score), 200, 180, 0);
}

function keyPressed() {
  if (keyCode == UP_ARROW & player.speedy != 40) {
    player.up();
  } else if (keyCode == DOWN_ARROW & player.speedy != -40) {
    player.down();
  } else if (keyCode == LEFT_ARROW & player.speedx != 40) {
    player.left();
  } else if (keyCode == RIGHT_ARROW & player.speedx != -40) {
    player.right();
  } else if (keyCode == ENTER){
    player.newgame();
  }
}

class Candy {

  constructor(){
    this.posX = int(random(0,20))*40+200;
    this.posY = int(random(0,20))*40+200;
    this.alive = true;
  }
  
  show(){
    this.col();
        
    if(this.alive){        
      image(candySprite.get(0,0,40,40),this.posX,this.posY);
    }
  }
  
  col(){
  
    if( player.posX == this.posX & player.posY == this.posY & this.alive){
      this.alive = false;
      player.grow();
      candySound.play();
    }
    
  }
}



class Snake{
  
  constructor( x, y,  sX,  sY) {
    this.posX = x;
    this.posY = y;
    this.speedx = sX;
    this.speedy = sY;

    this.score = 0;
    this.gameOver = false;
    
    this.tailX = [];
    this.tailY = [];
    this.spriteX = 120;
  }
  
  grow(){
    this.score++;
    candy = new Candy();
  }
  
  move(){
    this.tailX[1] = this.posX; 
    this.tailY[1] = this.posY;
    
    this.posY += this.speedy;
    this.posX += this.speedx;  
    
    fill(0);
    image(snakeSprite.get(this.spriteX,40,40,40),this.posX,this.posY);

    for (let i = this.score; i >= 1; i--){
      this.col_tail(this.tailX[i],this.tailY[i]);
      this.tailX[i+1] = this.tailX[i]; this.tailY[i+1] = this.tailY[i];
      image(snakeSprite.get(40,0,40,40),this.tailX[i],this.tailY[i],40); 
    }
    
    if ((this.posX < 200 | this.posX > width-240) | (this.posY < 200 | this.posY > width-240)){
      this.gameOver = true;
      gameoversSound.play();
    }
  }
  
  col_tail( tailX,  tailY){
    if (tailX == this.posX & tailY == this.posY){
      this.gameOver = true;
      gameoversSound.play();
    }
  }
  
    newgame(){
    this.gameOver = false;
    this.posX = 200;
    this.posY = 200;
    this.speedx = 40;
    this.speedy = 0;
    this.score = 0;
  }
  
    up(){
      this.speedy = -40;
      this.speedx = 0;
      this.spriteX = 40;
  }
    down(){
      this.speedy = 40;
      this.speedx = 0;
      this.spriteX = 80;
  }
    left(){
      this.speedy = 0;
      this.speedx = -40;
      this.spriteX = 0;
  }
    right(){
      this.speedy = 0;
      this.speedx = 40;
      this.spriteX = 120;
  }
  
}