var W = 640;
var H = 480;
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
  paint();
}
