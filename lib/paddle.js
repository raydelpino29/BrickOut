class Paddle {
  constructor(context, canvas) {
    this.paddleX = 300;
    this.paddleY = 280;
    this.paddleHeight = 5;
    this.paddleWidth = 100;
    this.context = context;
    window.addEventListener('keydown', (e) => {
      switch(e.key) {
        case "ArrowRight":
          if (this.paddleX + this.paddleWidth < canvas.width) {
            this.paddleX += 20;
          }
          break;
        case "ArrowLeft":
        if (this.paddleX > 0) {
          this.paddleX -= 20;
        }
      }
    });
  }
  drawPaddle() {
    this.context.beginPath();
    this.context.fillStyle = 'orange';
    this.context.fillRect(this.paddleX, this.paddleY, this.paddleWidth, this.paddleHeight);
    this.context.closePath();
  }
}

module.exports = Paddle;
