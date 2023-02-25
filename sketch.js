

    var towerImg, tower;
    var doorImg, door, doorsGroup;
    var climberImg, climber, climbersGroup;
    var ghost, ghostImg;
    var invisibleBlockGroup, invisibleBlock;
    var gameState = "play"
    
    function preload(){
      towerImg = loadImage("tower.png");
      doorImg = loadImage("door.png");
      climberImg = loadImage("climber.png");
      ghostImg = loadImage("ghost-standing.png");
      spookySound = loadSound("spooky.wav");
      gameendSound = loadSound("game-over-38511.mp3")
    }
    
    function setup(){
      createCanvas(600,600);
      //spookySound.loop();
      tower = createSprite(300,300);
      tower.addImage("tower",towerImg);
      tower.velocityY = 1;
      
      ghost = createSprite(200,200,50,50);
      ghost.scale = 0.3;
      ghost.addImage("ghost", ghostImg);



      doorsGroup = new Group();
      climbersGroup = new Group();
      invisibleBlockGroup = new Group();
      
      
    }
    
    function draw(){
      background(0);
      if (gameState === "play") {
        if(keyDown("space")){
          ghost.velocityY = -7;
        }
        
        
        if(keyDown("right_arrow")){
          ghost.x = ghost.x + 4;
        }

       
        if(keyDown("left_arrow")){
          ghost.x = ghost.x - 4;
        }
        
       
        
        if(tower.y > 400){
          tower.y = 300
        }


        ghost.velocityY = ghost.velocityY + 1
        
        
        
    
        
        
        if(climbersGroup.isTouching(ghost)){
          ghost.velocityY = 0;
        }
        if(ghost.y > 600 || ghost.isTouching(invisibleBlockGroup))
        {
          ghost.destroy();
          gameState = "end"
          
        }
        
        drawSprites();

        spawnDoors();
      }
      
      if (gameState === "end"){
        stroke("yellow");
        fill("blue");
        textSize(40);
        text("Game Over", 210,240)
       

      }

      
    
    }
    
    function spawnDoors() {
      
      if (frameCount % 200 === 0) {
        var door = createSprite(200,-50);
        var climber = createSprite(200,10);
        var invisibleBlock = createSprite(200,15);
        invisibleBlock.width = climber.width;
        invisibleBlock.height = 1;
        invisibleBlock.visible=false
        
        door.x = Math.round(random(120,400));
        invisibleBlock.x = door.x;
        climber.x = door.x;
       
        
        door.addImage(doorImg);
        climber.addImage(climberImg);
        
        door.velocityY = 1.4;
        climber.velocityY = 1.4;
        invisibleBlock.velocityY = 1.4;
        
        ghost.depth = door.depth;
        ghost.depth +=1;
       
        
        door.lifetime = 700;
        climber.lifetime = 700;
        invisibleBlock.lifetime = 700;
    
        
        
        doorsGroup.add(door);
        
        climbersGroup.add(climber);
        invisibleBlockGroup.add(invisibleBlock);
      }
    }
    
    



