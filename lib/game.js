const Paddle = require('./paddle.js');
const Ball = require('./ball.js');
const Bricks = require('./brick.js');

class Game {
  constructor(context, bricksArr, canvas) {
    this.context = context;
    this.paddle = new Paddle(context, canvas);
    this.ball = new Ball(context);
    this.bricks = new Bricks(context);
    this.bricksArr = bricksArr;
    this.powerUps = ["paddleSizeUp", "paddleSizeDown", "ballSpeedUp", "ballSpeedDown"];
    this.score = 0;
    this.gamePaused = false;
    this.drawFrame = this.drawFrame.bind(this);
    this.canvas = canvas;
    this.gameStarted = false;
    this.gameOver = false;
    this.brokenBricks = 0;
    this.numBricks = 0;
    this.bricksArr.forEach((row) => {
      row.forEach((col) => {
        this.numBricks += 1;
      });
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === "Enter" || e.key === "p" ) {
        this.toggleGamePause(e.key);
      } else if (e.key === "r" && this.gameOver) {
        this.resetGame();
      }
    });
  }

  resetGame () {
    this.bricksArr = this.bricks.createBricks();
    this.addPowerUps();
    this.gameOver = false;
    this.numBricks = 0;
    this.bricksArr.forEach((row) => {
      row.forEach((col) => {
        this.numBricks += 1;
      });
    });
    this.brokenBricks = 0;
    this.score = 0;
    this.ball.x = Math.random()*(600);
    this.ball.y = Math.random()*(300);
    this.paddle.paddleX = 300;
    this.paddle.paddleY = 280;
    this.paddle.paddleHeight = 5;
    this.paddle.paddleWidth = 100;
    this.ball.changeX = 3;
    this.ball.changeY = 2;
    requestAnimationFrame(this.drawFrame);
  }

  displayScore () {
    this.context.font = "20px Avenir";
    this.context.fillText(`Your Score is: ${this.score}`, 450, 20);
  }

  checkBrickCollision (x, y) {
    this.bricksArr.forEach((brickRow) => {
      brickRow.forEach((brick) => {
        if (x + this.ball.changeX >= brick.x && x +
          this.ball.changeX <= brick.x + this.bricks.brickWidth && y >= brick.y &&
          y <= brick.y + this.bricks.brickHeight ) {
            if (brick.powerUp === "paddleSizeUp") {
              this.paddle.paddleWidth *= 2;
            } else if (brick.powerUp === "paddleSizeDown") {
              this.paddle.paddleWidth /= 2;
            } else if (brick.powerUp === "ballSpeedUp") {
              this.ball.changeY *= 2;
              this.ball.changeX *= 2;
            } else if (brick.powerUp === "ballSpeedDown") {
              this.ball.changeY /= 2;
              this.ball.changeX /= 2;
            }
            this.ball.changeY = -this.ball.changeY;
            brick.health -= 1;
            brick.x = undefined;
            brick.y = undefined;
            this.brokenBricks += 1;
            this.score += 1;
        }
      });
    });
    if (this.brokenBricks === this.numBricks) {
      this.gameOver = true;
    }
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

  toggleGamePause(key) {
    if (this.gameOver) {
      this.context.font = "50px Avenir";
      this.context.fillStyle = 'black';
      this.context.fillText(`Your score is ${this.score}!`, this.canvas.width/4, this.canvas.height/2.5);
      this.context.fillText("Press 'r' to play again.", this.canvas.width/10, this.canvas.height/1.8);
    }
    if (key === "Enter") {
      if (!this.gameStarted) {
        this.gameStarted = true;
        requestAnimationFrame(this.drawFrame);
      }
    } else if (key === "p") {
      if (this.gamePaused) {
        this.gamePaused = false;
        requestAnimationFrame(this.drawFrame);
      } else if (!this.gamePaused) {
        this.gamePaused = true;
      }
    }
  }

  drawFrame () {
    if (this.gameOver) {
      this.toggleGamePause();
    } else if (!this.gamePaused && this.gameStarted ) {
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
        this.gameOver = true;
      } else if (this.ball.y - this.ball.changeY > (this.canvas.height - 20)) {
        if (this.ball.x > this.paddle.paddleX && this.ball.x < this.paddle.paddleX + this.paddle.paddleWidth ) {
          this.ball.changeY = -this.ball.changeY;
        }
      }

      if (this.ball.x - this.ball.changeX <= -5 + this.ball.radius || this.ball.x - this.ball.changeX > 605 - this.ball.radius) {
        this.ball.changeX = -this.ball.changeX;
      }
      requestAnimationFrame(this.drawFrame);

    } else if (!this.gameStarted) {
      this.context.font = "60px Avenir";
      this.context.fillText("Press Enter to Play!", this.canvas.width/12, this.canvas.height/2);

    } else if (this.gamePaused) {
      this.context.font = "50px Avenir";
      this.context.fillStyle = 'green';
      this.context.fillText("Press 'p' to continue.", this.canvas.width/10, this.canvas.height/2);
    }
  }
}

module.exports = Game;
