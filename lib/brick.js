class Bricks {
  constructor(context) {
    this.brickX = null;
    this.brickY = null;
    this.brickRow = 6;
    this.brickColumn = 4;
    this.bricksArr = [];
    this.brickWidth = 32;
    this.brickHeight = 15;
    this.context = context;
  }
  createBricks () {
    for (var row = 0; row < this.brickRow; row++) {
      this.bricksArr[row] = [];
      for (var col = 0; col < this.brickColumn; col++) {
        this.brickX = row*(this.brickWidth + 20) + 145;
        this.brickY = col*(this.brickHeight + 30) + 30;
        this.bricksArr[row][col] = { x: this.brickX, y: this.brickY, health: 1, powerUp: null };
      }
    }
    return this.bricksArr;
  }
  //this.powerUps = ["paddleSizeUp", "paddleSizeDown", "ballSpeedUp", "ballSpeedDown"];
  drawBrick (bricksArr) {
    bricksArr.forEach((brickRow) => {
      brickRow.forEach((brick) => {
        switch(brick.powerUp) {
          case "paddleSizeUp":
            this.context.beginPath();
            this.context.fillStyle = 'orange';
            this.context.fillRect(brick.x, brick.y, this.brickWidth, this.brickHeight);
            this.context.closePath(brick.x, brick.y, this.brickWidth, this.brickHeight);
            break;
          case "paddleSizeDown":
            this.context.beginPath();
            this.context.fillStyle = 'green';
            this.context.fillRect(brick.x, brick.y, this.brickWidth, this.brickHeight);
            this.context.closePath(brick.x, brick.y, this.brickWidth, this.brickHeight);
            break;
          case "ballSpeedUp":
            this.context.beginPath();
            this.context.fillStyle = 'blue';
            this.context.fillRect(brick.x, brick.y, this.brickWidth, this.brickHeight);
            this.context.closePath(brick.x, brick.y, this.brickWidth, this.brickHeight);
            break;
          case "ballSpeedDown":
            this.context.beginPath();
            this.context.fillStyle = 'yellow';
            this.context.fillRect(brick.x, brick.y, this.brickWidth, this.brickHeight);
            this.context.closePath(brick.x, brick.y, this.brickWidth, this.brickHeight);
            break;
          default:
            this.context.beginPath();
            this.context.fillStyle = 'red';
            this.context.fillRect(brick.x, brick.y, this.brickWidth, this.brickHeight);
            this.context.closePath(brick.x, brick.y, this.brickWidth, this.brickHeight);
            var brickImage = document.getElementById("brick");
            this.context.drawImage(brickImage, brick.x, brick.y, this.brickWidth, this.brickHeight);
        }
      });
    });
  }
}

module.exports = Bricks;
