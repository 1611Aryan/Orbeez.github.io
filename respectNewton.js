function randomColor() {
  var values = "1234567890ABCDEF";
  var val = values.split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += val[Math.floor(Math.random() * 16)];
  }
  if (color == '#000000') {
    return '#ffffff';
  } else {
    return color;
  }
}


////////////////////////////////////////
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//////////////////////////////////////////
var c = canvas.getContext('2d');
var mouse = {
  x: undefined,
  y: undefined
};
window.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});
window.addEventListener('resize', function (event) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});
////////////////////////////////////////
function Circle(x, y, dx, dy, radius, color, fill) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minradius = radius;
  this.color = color;
  this.fill = fill;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, (Math.PI) * 2, false);
    c.strokeStyle = this.color;
    c.fillStyle = this.color;
    c.fill();
    c.stroke();

  }
  //Make the circles move and bounce upon hitting a wall
  this.getALife = function () {
    if (this.x + this.radius > canvas.width - 5 || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > canvas.height - 5 || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    if (mouse.x - this.x - this.radius < 50 && mouse.x - this.x - this.radius > -50 && mouse.y - this.y - this.radius < 50 && mouse.y - this.y - this.radius > -50) {
      if (this.x + this.radius - mouse.x > 5 && this.y + this.radius - mouse.y > 5 && this.radius < 50) {
        this.x -= 10;
        this.y -= 10;
        this.radius += 0.5;
      }
      if (this.x + this.radius - mouse.x <= 5 || this.y + this.radius - mouse.y <= 5 && this.radius > 2) {
        {
          this.x += 30;
          this.y += 30;
          this.radius -= 0.05;
        }
      }

    } else if (this.radius > this.minradius) {
      this.radius -= 0.5;
    }
    this.draw();
  }
}
////////////////////////////////////////////////////

var collection = [];

function init() {
  collection = [];
  for (var i = 0; i <= 1200; i++) {
    var radius = (Math.random() * canvas.width / 75) + 1;
    //location
    var x = (Math.random() * (canvas.width - 5 - radius * 2)) + radius;
    var y = (Math.random() * (canvas.height - 5 - radius * 2)) + radius;
    //Velocity
    var dx = (Math.random() - 0.5) * 10;
    var dy = (Math.random() - 0.5) * 10;
    var color = randomColor();
    var fill = randomColor();
    var circle = new Circle(x, y, dx, dy, radius, color, fill);
    collection.push(circle);
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < collection.length; i++) {
    collection[i].getALife();
  }
}
//////////////////////////////////////////////////////
init();
animate();
