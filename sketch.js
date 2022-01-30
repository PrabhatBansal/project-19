var Boy, BoyImg, boyjumpImg, dieImg;
var finalDogImg;
var dog, dogImg;
var Bg1, bg1Img;
var Start, StartImg;
var YourScore = 0;
var coin, coinImg, CoinsGroup;

var Bg, BgImg;
var score = 0;
var obstacles1, obstacles2, obstacles3, obstacles4, obstacles5;

var obstacles1Img, obstacles2Img, obstacles3Img, obstacles4Img, obstacles5Img;

var obstacleGroup;

var invisibleGround;
var gameState,
  serve = 2,
  play = 1,
  end = 0,
  Restart = 3;

function preload() {
  BgImg = loadImage("bg.jpg");
  bg1Img = loadImage("Bg1.jpg");
  StartImg = loadImage("Start.png");
  coinImg = loadImage("coin.png");
  finalDogImg = loadAnimation("dogRunner/dog4.png");

  BoyjumpImg = loadAnimation(
    "boyJump/Jump1.png",
    "boyJump/Jump2.png",
    "boyJump/Jump3.png",
    "boyJump/Jump4.png",
    "boyJump/Jump5.png",
    "boyJump/Jump6.png",
    "boyJump/Jump7.png",
    "boyJump/Jump8.png",
    "boyJump/Jump9.png",
    "boyJump/Jump10.png",
    "boyJump/Jump11.png",
    "boyJump/Jump12.png",
    "boyJump/Jump13.png",
    "boyJump/Jump14.png",
    "boyJump/Jump15.png"
  );
  BoyImg = loadAnimation(
    "boyRun/Run1.png",
    "boyRun/Run2.png",
    "boyRun/Run3.png",
    "boyRun/Run4.png",
    "boyRun/Run5.png",
    "boyRun/Run6.png",
    "boyRun/Run7.png",
    "boyRun/Run8.png",
    "boyRun/Run9.png",
    "boyRun/Run10.png",
    "boyRun/Run11.png",
    "boyRun/Run12.png",
    "boyRun/Run13.png",
    "boyRun/Run14.png",
    "boyRun/Run15.png"
  );

  dieImg = loadAnimation(
    "boydie/Dead1.png",
    "boydie/Dead2.png",
    "boydie/Dead3.png",
    "boydie/Dead4.png",
    "boydie/Dead12.png",
    "boydie/Dead13.png",
    "boydie/Dead14.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png",
    "boydie/Dead15.png"
  );

  dogImg = loadAnimation(
    "dogRunner/dog1.png",
    "dogRunner/dog2.png",
    "dogRunner/dog3.png",
    "dogRunner/dog4.png",
    "dogRunner/dog5.png",
    "dogRunner/dog6.png",
    "dogRunner/dog7.png",
    "dogRunner/dog8.png",
    "dogRunner/dog9.png"
  );

  obstacles1Img = loadImage("game_obstacle/spike A.png");

  obstacles2Img = loadImage("game_obstacle/spike B.png");

  obstacles3Img = loadImage("game_obstacle/spike C.png");

  obstacles4Img = loadImage("game_obstacle/spike D.png");

  obstacles5Img = loadImage("game_obstacle/spike E.png");
}

function setup() {
  createCanvas(700, 400);

  Bg = createSprite(400, 200, 800, 400);
  Bg.addImage(BgImg);

  invisibleGround = createSprite(400, 335, 800, 10);
  // invisibleGround.debug = true;
  invisibleGround.visible = false;

  obstacleGroup = new Group();

  Boy = createSprite(250, 280, 4, 5);
  Boy.addAnimation("running", BoyImg);
  Boy.addAnimation("jump", BoyjumpImg);
  Boy.addAnimation("die", dieImg);
  Boy.scale = 0.2;
  Boy.setCollider("rectangle", -130, 0, 260, 400);
  // Boy.debug=true;

  dog = createSprite(80, 285, 4, 5);
  dog.addAnimation("running", dogImg);
  dog.addAnimation("stop", finalDogImg);
  dog.scale = 0.6;
  dog.setCollider("rectangle", 25, 0, 200, 100);

  Bg1 = createSprite(350, 200, 700, 400);

  Start = createSprite(350, 200, 20, 10);
  CoinsGroup = new Group();

  gameState = serve;
}

function draw() {
  background(225);
  if (gameState === serve) {
    Bg1.addImage(bg1Img);

    Start.addImage(StartImg);
    Start.scale = 0.5;
    start();
  } else if (gameState === play) {
    Bg1.visible = false;
    Start.visible = false;

    SpwanCoin();
    jump();
    gravity();
    spawnObstacle();
    die();
    run();
    bgRun();
    dogJump();
    depth();
    scoring();
  } else if (gameState === end) {
    Bg.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    Boy.velocityY = 0;
    gravity();
    score = 0;
    CoinsGroup.setVelocityXEach(0);
    dog.velocityX = 3;
    Boy.setCollider("rectangle", 0, 0, 100, 400);
    dog.setCollider("rectangle", 0, 0, 50, 100);
    // dog.debug=true
    // dog.collide(Boy);
    dog.depth = Boy.depth;
    dog.depth += 1;
    Boy.changeAnimation("die", dieImg);
    if (dog.collide(Boy)) {
      dog.changeAnimation("stop", finalDogImg);
      dog.velocityX = 0;
      dog.scale = 0.8;
      Start.visible = true;
      Bg1.visible = true;
      Bg1.depth = Boy.depth;
      Start.depth = Boy.depth;
      Bg1.depth = dog.depth;
      Start.depth = dog.depth;
      Start.depth += 1;
      Bg1.depth += 1;
      gameState = serve;
      CoinsGroup.destroyEach();
      obstacleGroup.destroyEach();
    }
  }
  drawSprites();
  fill(`lightgreen`);
  strokeWeight(5);
  stroke(`darkgreen`);
  rect(585, 15, 100, 50);

  textSize(20);
  strokeWeight(0);
  fill(`black`);
  text("Score: " + score, 600, 50);
  if (gameState === serve) {
    fill("PINK");
    strokeWeight(6);
    stroke("RED");
    rect(290, 120, 150, 50);
    fill("Black");
    strokeWeight(6);
    stroke("RED");
    textSize(20);
    text("Your Score : " + YourScore, 300, 150);
  }
}
function gravity() {
  Boy.velocityY += 0.8;
  dog.velocityY += 0.8;
  Boy.collide(invisibleGround);
  dog.collide(invisibleGround);
}
function jump() {
  if (keyDown("space") && Boy.y > 270) {
    Boy.changeAnimation("jump", BoyjumpImg);
    Boy.velocityY = -15;
  }
}
function spawnObstacle() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(700, 300, 10, 20);
    obstacle.velocityX = -5;
    let rand = Math.round(random(1, 5));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacles1Img);
        break;
      case 2:
        obstacle.addImage(obstacles2Img);
        break;
      case 3:
        obstacle.addImage(obstacles3Img);
        break;
      case 4:
        obstacle.addImage(obstacles4Img);
        break;
      case 5:
        obstacle.addImage(obstacles5Img);
        break;

      default:
        break;
    }
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
    obstacle.lifetime = 140;
    // obstacle.debug=rue;
  }
}
function run() {
  if (Boy.y == 290) {
    Boy.changeAnimation("running", BoyImg);
  }
}
function die() {
  if (obstacleGroup.isTouching(Boy)) {
    gameState = end;
    // alert("youna")
  }
}
function bgRun() {
  Bg.velocityX = -5;
  if (Bg.x < 300) {
    Bg.x = Bg.width / 2;
  }
}
function dogJump() {
  if (obstacleGroup.isTouching(dog)) {
    dog.velocityY = -12;
  }
}
function depth() {
  obstacleGroup.depth = Boy.depth;
  Boy.depth += 1;
}
function start() {
  if (mousePressedOver(Start)) {
    gameState = play;
    Start.visible = true;
    Bg1.visible = true;
    dog.changeAnimation("running", dogImg);
    dog.scale = 0.6;
    dog.x = 80;

    Boy.setCollider("rectangle", -130, 0, 260, 400);
    dog.setCollider("rectangle", 25, 0, 200, 100);
  }
  jump();
  gravity();
}

function SpwanCoin() {
  if (frameCount % 200 === 0) {
    coin = createSprite(random(600, 800), 150, 10, 5);
    coin.x != obstacleGroup.x + 50;
    coin.addImage(coinImg);
    coin.velocityX = -5;
    coin.scale = 0.1;
    CoinsGroup.add(coin);
    // coin.debug=true;
    coin.lifetime = 150;
  }
}
function scoring() {
  if (CoinsGroup.isTouching(Boy)) {
    score += 1;
    YourScore = score;

    CoinsGroup.destroyEach();
  }
}
