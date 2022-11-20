function setup() {
  createCanvas(1200, 1200);
  frameRate(6);   

  player = new Snake(200,200,0,0); 
  candy = new Candy(random(200,800),random(200,800));  
}

function draw() {
  
  if(!player.gameOver){
    background(204);
    
    fill(255);          //Arène 
    square(200,200,800);
    
    candy.show();
    
    player.move();

  
  }else{
    player.gameOver = true;
    textSize(96);
    text("Game Over !", 100, 300, 0);
    textSize(48);
    text("Press Enter...", 160, 360, 0);
}
  
  textSize(24);
  text("Score : "+str(player.score), 10, 30, 0);
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

function makeCandy(){

    candy = new Candy(random(200,800),random(200,800)); 

}

class Candy {

    constructor(x, y){
        this.alive = true;
        this.spawn();
    }
    
    spawn(){
        for (let i = 0; i < 840; i +=40){
          if (this.x <= i){ 
            this.posX = i;
            this.i = 800;
          }
        }
        for (let i = 0; i < 840; i +=40){
          if (this.y <= i){ 
            this.posY = i;
            this.i = 800;
          }
        }
    }
    
    
    show(){
      this.col();
          
      if(this.alive){
        
        fill(204, 102, 0);
        square(this.posX,this.posY,40);
      }
    }
    
    col(){
    
      if( player.posX == this.posX & player.posY == this.posY & this.alive){
        this.alive = false;
        player.grow();
        
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

      this.snakeSprite = loadImage('img/snakesprite.jpg');
    }
    
    grow(){
      this.score +=1;
      candy = new Candy();
    }
    
    move(){
      this.tailX[1] = this.posX; 
      this.tailY[1] = this.posY;
      
      this.posY += this.speedy;
      this.posX += this.speedx;  
      
      fill(0);
      stroke(153);
      image(this.snakeSprite.get(120,0,40,40),this.posX,this.posY);
      
      square(this.posX,this.posY,40); 
      for (let i = this.score; i >= 1; i--){
        //Vérifie les collisions 
        this.col_tail(this.tailX[i],this.tailY[i]);
        
        // Oppère le déplacement 
        this.tailX[i+1] = this.tailX[i]; this.tailY[i+1] = this.tailY[i];
        
        // Affiche la Tail
        square(this.tailX[i],this.tailY[i],40); 
      }
      
      if ((this.posX < 200 | this.posX > width-240) | (this.posY < 200 | this.posY > width-240)){
        this.gameOver = true;
      }
    }
    
    col_tail( tailX,  tailY){
      if (tailX == this.posX & tailY == this.posY){
        this.gameOver = true;
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
    }
     down(){
        this.speedy = 40;
        this.speedx = 0;
    }
     left(){
        this.speedy = 0;
        this.speedx = -40;
    }
     right(){
        this.speedy = 0;
        this.speedx = 40;
    }
    
  }