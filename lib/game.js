const Paddle = require('./paddle.js');
const Ball = require('./ball.js');
const Bricks = require('./brick.js');

class Game {
  constructor(context, bricksArr, canvas) {
    this.context = context;
    this.paddle = new Paddle(context);
    this.ball = new Ball(context);
    this.bricks = new Bricks(context);
    this.bricksArr = bricksArr;
    this.powerUps = ["paddleSize", "ballSpeedUp", "ballSpeedDown"];
    this.score = 0;
    this.drawFrame = this.drawFrame.bind(this);
    this.canvas = canvas;
  }
  displayScore () {
    this.context.font = "20px Avenir";
    this.context.fillText(`Your Score is: ${this.score}`, 450, 20 );
  }
  checkBrickCollision (x, y) {
    this.bricksArr.forEach((brickRow) => {
      brickRow.forEach((brick) => {
        if (x + this.ball.changeX >= brick.x && x +
          this.ball.changeX <= brick.x + this.bricks.brickWidth && y >= brick.y &&
          y <= brick.y + this.bricks.brickHeight ) {
            this.ball.changeY = -this.ball.changeY;
            brick.health -= 1;
            brick.x = null;
            brick.y = null;
            this.score += 1;
        }
      });
    });
  }
  givePowerUp(powerUp) {
    let powerBrick;
    let row;
    let col;
    row = Math.floor(Math.random()*this.bricksArr.length);
    col = Math.floor(Math.random()*this.bricksArr[row].length);
    powerBrick = this.bricksArr[row][col];
    if (!powerBrick.powerUp) {
      powerBrick.powerUp = powerUp;
    } else {
      this.givePowerUp();
    }
  }
  addPowerUps () {
    this.powerUps.forEach((powerUp) => this.givePowerUp(powerUp));
  }
  drawFrame () {
    let circleX;
    let circleY;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (var counter = 1; counter < 361; counter++) {
      circleX = this.ball.x + this.ball.radius*Math.cos(Math.PI*counter/180);
      circleY = this.ball.y + this.ball.radius*Math.sin(Math.PI*counter/180);
      this.checkBrickCollision(circleX, circleY);
    }
    this.displayScore();
    this.bricks.drawBrick(this.bricksArr);
    this.paddle.drawPaddle();
    this.ball.redrawBall();
    this.ball.x -= this.ball.changeX;
    this.ball.y -= this.ball.changeY;
    if (this.ball.y - this.ball.changeY <= -5 + this.ball.radius) {
      this.ball.changeY = -this.ball.changeY;
    } else if (this.ball.y - this.ball.changeY > (this.canvas.height - 11)) {
      document.location.reload();
    } else if (this.ball.y - this.ball.changeY > (this.canvas.height - 20)) {
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
