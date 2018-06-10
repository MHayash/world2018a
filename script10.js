var W = 640;
var H = 480;
alert('a');
function setup() {
  createCanvas(640, 480);
  background(222, 222, 222);fill(0);
  line(-640, 0, 640, 0);triangle(640, 0, 630, 5, 630, -5);text('x', 630, 20);
  line(0, -480, 0, 480);triangle(0, 480, -5, 470, 5, 470);text('y', 10, 470);

  // origin
  strokeWeight(5);point(0, 0);
  strokeWeight(1);fill(255);
  init();
}

function draw() {
  background(222,222,222);
  for (var i = bullets.length - 1; i >= 0; i--) {
    var b = bullets[i];
    b.move();
    b.draw();
  }
  
  if (bullets.length > 0) {
    if (!bullets[0].alive()) {
      bullets.shift();
    }
  }
  
  paint();
}

function mousePressed() {
  bullets.push(new Bullet(mouseX, mouseY));
}

var bullets = new Array();

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.count = 0;
  }

  move() {
    //this.x = this.x + 0.1;
    //this.y = this.y;
    var ret = tamaMove(this.x, this.y);
    this.x = ret[0];
    this.y = ret[1];
  }
  
  alive () {
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) {
      return false;
    } else {
      return true;
    }
  }

  draw () {
    this.count += 1;
    fill(0);
    ellipse(this.x, this.y, 50, 50);
  }

}
