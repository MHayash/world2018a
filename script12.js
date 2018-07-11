var W = 640;
var H = 480;
var Level = 1;
var frameCount = 0;
var s3x = 0;
var s3y = 0;
var s3vx = 0;
var s3vy = 0;
var s4x = 0;
var s4y = 0;
var s4vx = 0;
var s4vy = 0;
var myX = 0;
var myY = 0;
var level = -1;
var gameover = false;

function setup() {
  createCanvas(640, 480);
  background(222, 222, 222);fill(0);
  line(-640, 0, 640, 0);triangle(640, 0, 630, 5, 630, -5);text('x', 630, 20);
  line(0, -480, 0, 480);triangle(0, 480, -5, 470, 5, 470);text('y', 10, 470);

  // origin
  strokeWeight(5);point(0, 0);
  strokeWeight(1);fill(255);
  startup();
}


function draw() {
  if (gameover) {
    return;
  }
  frameCount += 1;
  if (frameCount < 100) {
    noStroke(0);
    fill(0);
    text('' + frameCount, 300, 240);
    return;
  }
  paint();
  noStroke();
  fill(0);
  text('Level:' + Level, 0, 20);

  if (level == -1) {
    Level = Math.floor(frameCount / 300) + 1;
  } else {
    Level = level;
  }
  for (var i = 0; i < 4; i++) {
    var enemyBullets = eb[i];
    if (i < 2) {
      for (var e of enemyBullets) {
        e.move();
        e.draw();
      }
    } else if (i == 2) {
      for (var e of enemyBullets) {
        e.x = s3x;
        e.y = s3y;
        //e.draw();
      }
    } else if (i == 3) {
      for (var e of enemyBullets) {
        e.x = s4x;
        e.y = s4y;
        //e.draw();
      }
    }

    if (enemyBullets.length < Level / (i + 1) && frameCount % (10) == 0) {
      switch(i) {
        case 0: 
          enemyBullets.push(new EnemyBullet2(30, 30, shot1, 255, 0, 0));
          break;
        case 1:
          enemyBullets.push(new EnemyBullet2(610, 450, shot2, 0, 127, 255));
          break;
        case 2:
          if (enemyBullets.length == 0) {
            enemyBullets.push(new EnemyBullet(30, 450, null, 255, 127, 0));
            [s3vx, s3vy] = shot3(myFighter.x, myFighter.y, 30, 450);
            [s3x, s3y] = [30, 450];
          }
          break;
        case 3:
          if (enemyBullets.length == 0) {
            enemyBullets.push(new EnemyBullet(610, 30, null, 0, 255, 0));
            [s4vx, s4vy] = shot4(myFighter.x, myFighter.y, 610, 30);
            [s4x, s4y] = [610, 30];
          }
          break;
      }
      
    }

    if (enemyBullets.length > 0) {
      if (!enemyBullets[0].alive()) {
        enemyBullets.shift();
      }
    }
  }

  
  myFighter.draw();

  for (var i = 0; i < 4; i++) {
    var enemyBullets = eb[i];
    for (var e of enemyBullets) {
      if (hit(e.x, e.y, myFighter.x, myFighter.y, 10)) {
        gameover = true;
        noStroke(0);
        fill(0);
        text('game over', 300, 240);
      }
    }
  }

  myX = myFighter.x;
  myY = myFighter.y;
  
  stroke(0);
  point(30, 30);
  point(610, 30);
  point(610, 450);
  point(30, 450);

}

function mousePressed() {
}

function keyReleased() {
  switch(keyCode) {
    case 38: // up
      myFighter.VY = 0;
      break;
    case 40: // down
      myFighter.VY = 0;
      break;
    case 39: // right
      myFighter.VX = 0;
      break;
    case 37: // left
      myFighter.VX = 0;
      break;
  }
}

function keyPressed() {
  //console.log(keyCode);
  if (keyCode == 90) { // Z
  } else if (keyCode == 88) { // X
  } else if (keyCode == 67) { // C
  } else if (keyCode == 86) { // V
  }

  switch(keyCode) {
    case 38: // up
      myFighter.VY = -1;
      break;
    case 40: // down
      myFighter.VY = 1;
      break;
    case 39: // right
      myFighter.VX = 1;
      break;
    case 37: // left
      myFighter.VX = -1;
      break;
  }

}

class MyFigher {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.VX = 0;
    this.VY = 0;
    this.speed = 2;
  }

  draw () {
    fill(0);
    this.x = Math.max(Math.min(mouseX, 640),0);
    this.y = Math.max(Math.min(mouseY, 480),0);
    var x = this.x;
    var y = this.y;
    fill(127, 127, 127);
    noStroke();
    ellipse(x, y, 20, 20);
    stroke(255, 0, 0);
    strokeWeight(3);
    point(x, y);
  }
}

var mode = 0;

class EnemyBullet {
  constructor(x, y, func, r, g, b) {
    this.x = x;
    this.y = y;
    this.func = func;
    this.vx = 0;
    this.vy = 0;
    this.r = r;
    this.g = g;
    this.b = b;
  }

  move() {
    [this.vx, this.vy] = this.func(myFighter.x, myFighter.y, this.x, this.y, this.vx, this.vy);
    this.x = this.vx + this.x;
    this.y = this.vy + this.y;
  }
  
  alive () {
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) {
      return false;
    } else {
      return true;
    }
  }

  draw () {
    fill(this.r, this.g, this.b);
    noStroke();
    ellipse(this.x, this.y, 20, 20);
  }
}

class EnemyBullet2 {
  constructor(x, y, func, r, g, b) {
    this.x = x;
    this.y = y;
    this.ret = func(myFighter.x, myFighter.y, x, y);
    this.r = r;
    this.g = g;
    this.b = b;
  }

  move() {
    this.x = this.x + this.ret[0];
    this.y = this.y + this.ret[1];
  }
  
  alive () {
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) {
      return false;
    } else {
      return true;
    }
  }

  draw () {
    fill(this.r, this.g, this.b);
    noStroke();
    ellipse(this.x, this.y, 20, 20);
  }
}

var bullets = new Array();
var myFighter = new MyFigher(640/2, 480/2);
var enemyBullets1 = new Array();
var enemyBullets2 = new Array();
var enemyBullets3 = new Array();
var enemyBullets4 = new Array();

var eb = new Array(
  enemyBullets1, enemyBullets2, enemyBullets3, enemyBullets4
);
