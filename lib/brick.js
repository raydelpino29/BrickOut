const Ball = require('./ball.js');

class Bricks {
  constructor(context) {
    this.brickX = null;
    this.brickY = null;
    this.brickRow = 6;
    this.brickColumn = 4;
    this.bricksArr = [];
    this.brickWidth = 32;
    this.brickHeight = 15;
    this.ball = new Ball();
    this.context = context;
  }
  createBricks () {
    for (var row = 0; row < this.brickRow; row++) {
      this.bricksArr[row] = [];
      for (var col = 0; col < this.brickColumn; col++) {
        this.brickX = row*(this.brickWidth + 20) + 145;
        this.brickY = col*(this.brickHeight + 30) + 30;
        this.bricksArr[row][col] = { x: this.brickX, y: this.brickY, health: 1 };
      }
    }
    return this.bricksArr;
  }
  drawBrick (bricksArr) {
    bricksArr.forEach((brickRow) => {
      brickRow.forEach((brick) => {
        if (brick.health === 1 ) {
          this.context.beginPath();
          this.context.fillStyle = 'red';
          this.context.fillRect(brick.x, brick.y, this.brickWidth, this.brickHeight);
          this.context.closePath(brick.x, brick.y, this.brickWidth, this.brickHeight);
        } else {
          this.context.clearRect(brick.x, brick.y, this.brickWidth, this.brickHeight);
        }
      });
    });
  }
}

module.exports = Bricks;
