const Paddle = require('./paddle.js');
const Ball = require('./ball.js');
const Bricks = require('./brick.js');

class Game {
  constructor(context, bricksArr) {
    this.context = context;
    this.paddle = new Paddle(context);
    this.ball = new Ball(context);
    this.bricks = new Bricks(context);
    this.score = 0;
    this.drawFrame = this.drawFrame.bind(this);
  }
  displayScore () {
    this.context.font = "20px Avenir";
    this.context.fillText(`Your Score is: ${this.score}`, 450, 20 );
  }

  drawFrame () {
    let circleX;
    let circleY;
    this.context.clearRect(0, 0, 600, 300);
    for (var counter = 1; counter < 361; counter++) {
      circleX = this.ball.x + this.ball.radius*Math.cos(Math.PI*counter/180);
      circleY = this.ball.y + this.ball.radius*Math.sin(Math.PI*counter/180);
      this.bricks.checkBrickCollision(circleX, circleY);
    }
    this.displayScore();
    this.bricks.drawBrick();
    this.paddle.drawPaddle();
    this.ball.redrawBall();
    this.ball.x -= this.ball.changeX;
    this.ball.y -= this.ball.changeY;
    if (this.ball.y - this.ball.changeY <= -5 + this.ball.radius) {
      this.ball.changeY = -this.ball.changeY;
    } else if (this.ball.y - this.ball.changeY > 289) {
      document.location.reload();
    } else if (this.ball.y - this.ball.changeY > 280) {
      if (this.ball.x > this.paddle.paddleX && this.ball.x < this.paddle.paddleX + this.paddle.paddleWidth ) {
        this.ball.changeY = -this.ball.changeY;
      }
    }
    if (this.ball.x - this.ball.changeX <= -5 + this.ball.radius || this.ball.x - this.ball.changeX > 605 - this.ball.radius) {
      this.ball.changeX = -this.ball.changeX;
    }
    requestAnimationFrame(this.drawFrame);
  }
}

module.exports = Game;
