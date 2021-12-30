var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var soloinvisivel;
var nuvem;
var imagemnuvem;
var cacto;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var pontuacao = 0;
var estadojogo = "jogando";
var gruponuvem, grupocacto;
var gameover;
var restart;
var gameovers;
var restarts;
function preload() {
  //carregando animações do trex
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
  imagemnuvem = loadImage("cloud.png");
  //carregando animação do solo
  groundImage = loadImage("ground2.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameover = loadImage("gameOver.png");
  restart = loadImage("restart.png");
}
function obstaculos(){
 if(frameCount%130 == 0 ){
  cacto = createSprite(width,170);
  cacto.velocityX = -4;
  var aleatorio = round(random(1,6));
  switch(aleatorio){
    case 1:cacto.addImage(obstacle1);
    break;
    case 2:cacto.addImage(obstacle2);
    break;
    case 3:cacto.addImage(obstacle3);
    break;
    case 4:cacto.addImage(obstacle4);
      cacto.scale = 0.05
      console.log(cacto.scale)
      break;
    case 5:cacto.addImage(obstacle5);
      cacto.scale = 0.05
      console.log(cacto.scale)
      break;
    case 6:cacto.addImage(obstacle6);
    break;
    default:break;
    
  }
  cacto.scale = 0.10;
  
  cacto.lifetime = 500;
  grupocacto.add(cacto);
}
  
}




function gerarnuvens(){
  if(frameCount%120 == 0){
    nuvem = createSprite(width,100);
    nuvem.velocityX = -4;
    nuvem.addImage(imagemnuvem);
    nuvem.scale = 0.1;
    nuvem.y = Math.round(random(40,120))
    trex.depth = nuvem.depth;
    trex.depth = trex.depth + 1;
    nuvem.lifetime = 350;
    gruponuvem.add(nuvem);
    
  }
  
}
function setup() {
  createCanvas(windowWidth,windowHeight);

  //criar um sprite trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collided",trex_collided);
  restarts = createSprite(50,50,10,30);
  restarts.scale = 0.5;
  gameovers = createSprite(height,60);
  gameovers.scale = 0.7;
  restarts.addImage("carregar",restart);
  gameovers.addImage("end",gameover);
  //criar um sprite ground (chão)
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  soloinvisivel = createSprite(200,190,400,10);
  soloinvisivel.visible = false;
  grupocacto = createGroup();
  gruponuvem = createGroup();
  trex.debug = true
  trex.setCollider("circle",0,0,25);
}

function draw() {
    background(255);
    console.log(frameCount);
    if(estadojogo == "jogando"){
        gameovers.visible = false
        restarts.visible = false
        if  (touches.length > 0||keyDown("space")&&trex.y>100) {
            trex.velocityY = -14;
            
           }
           
           pontuacao = pontuacao + round(frameCount/120)
            
           gerarnuvens();  
                trex.velocityY = trex.velocityY + 0.9
                obstaculos();
                if (ground.x < 0) {
                  ground.x = ground.width / 2;
                }
         if(grupocacto.isTouching(trex)){
           estadojogo = "FimDeJogo"
         }
      }
  
  if(estadojogo == "FimDeJogo"){
   gameovers.visible = true
   restarts.visible = true
   trex.changeAnimation("collided",trex_collided);
   ground.velocityX = 0
   grupocacto.setVelocityXEach(0)
   gruponuvem.setVelocityXEach(0)
   grupocacto.setLifetimeEach(-1)
   gruponuvem.setLifetimeEach(-1)
   trex.velocityY = 0
   if(mousePressedOver(restarts)){
    pontuacao = 0;
    trex.changeAnimation("running", trex_running);
    grupocacto.destroyEach()
    gruponuvem.destroyEach()
    estadojogo = "jogando"
    console.log(estadojogo)
    ground.x = ground.width /2;
  ground.velocityX = -4;
  }
  if(grupocacto.isTouching(trex)){
    trex.velocityY = -12;
   }

}
  
  
  
  text(pontuacao,1300,50);
  trex.collide(soloinvisivel);
  drawSprites();
}