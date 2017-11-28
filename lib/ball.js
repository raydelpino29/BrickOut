class Ball {
  constructor(context) {
    this.x = Math.random()*(600);
    this.y = Math.random()*(300);
    this.changeX = 3;
    this.changeY = 2;
    this.radius = 5;
    this.context = context;
  }
  redrawBall () {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.context.fillStyle = 'gray';
    this.context.fill();
    this.context.closePath();
    var ballImage = document.getElementById("ball");
    this.context.drawImage(ballImage, this.x, this.y, this.radius, this.radius);
  }
}

module.exports = Ball;
