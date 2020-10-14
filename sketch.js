var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload()
{
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() 
{
  createCanvas(600, 600);

  //creating tower
  tower = createSprite(300, 300);
  tower.addImage(towerImg);
  tower.velocityY = 1;

  //creating ghost
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;

  //creating groups
  invisibleBlockGroup = new Group();
  doorsGroup = new Group();
  climbersGroup = new Group();
}

function draw() 
{
  background(0);

  if (gameState === "play") {

    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }

    if (tower.y > 400) {
      tower.y = 300;
    }

    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 3;
    }

    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 3;
    }

    if (keyDown("Space")) {
      ghost.velocityY = -5;
    }

    //for playing sound
    spookySound.play();

    //giving gravity
    ghost.velocityY = ghost.velocityY + 0.8;

    //calling the function
    spawnDoors();

    //ending the game
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end";
    }
    
    //for making the spites visible
    drawSprites();
  }

  if (gameState === "end") 
  {
    stroke("yellow");
    fill("yellow");
    textSize(25);
    text("Game Over", 200, 200);

    //stopping the sound when the game ends
    spookySound.stop();
  }

}

function spawnDoors() 
{
  if (frameCount % 240 === 0) 
  {
    //creating doors as obstacle
    var door = createSprite(200, -50);
    door.addImage(doorImg);
    door.velocityY = 1;
    door.x = Math.round(random(120, 400));
    door.lifetime = 800;
    doorsGroup.add(door);
    ghost.depth = door.depth;
    ghost.depth += 1;

    //creating climbers as obstacle
    var climbers = createSprite(200, 10);
    climbers.addImage(climberImg);
    climbers.velocityY = 1;
    climbers.x = door.x;
    climbers.lifetime = 800;
    climbersGroup.add(climbers);

    //creating invisible block as obstacle
    var invisibleBlock = createSprite(200, 15);
    invisibleBlock.velocityY = 1;
    invisibleBlock.x = door.x;
    invisibleBlock.width = climbers.width;
    invisibleBlock.height = 2;
    invisibleBlock.lifetime = 800;
    invisibleBlockGroup.add(invisibleBlock);
  }


}