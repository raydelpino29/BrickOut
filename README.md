## Play Now
![brickout-background copy](https://user-images.githubusercontent.com/29177545/33031343-032c906a-cdec-11e7-8df7-32b4a0c3db85.png)

[live link](https://raydelpino29.github.io/BrickOut/)

## Game Directions

- Press left and right arrow keys to move paddle
- Bounce the ball off the paddle to destroy bricks
- Destroy all bricks to win game
- Hit different colored bricks to get power ups
  - Green Brick => Decreases Paddle Size
  - Orange Brick => Increases Paddle Size
  - Blue Brick => Increases Ball Speed
  - Yellow Brick => Decreases Ball Speed
- Every destroyed brick adds 1 to your score

## Collision Detection

The paddle, ball, walls, and all bricks are constantly aware of their location. They compare their location against one another to determine if they are touching. If the ball and paddle are touching, the ball changes direction. The ball direction will also change if the ball and wall are colliding. If the ball collides with a brick, it changes direction, destroys the brick, and applies the corresponding power up if needed.

```javascript
//ball and brick collision detection
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
          this.score += 1;
      }
    });
  });
}
//ball, paddle, and wall collision detection
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
}
```
Some of the more challenging code to write was when implementing the collision detection of the ball and bricks. When a circle collides with a square, you have to calculate all the points on the circumference of the circle and compare them against the length and width of the bricks.

```javascript
//calculating all points on circle at each frame
for (var counter = 1; counter < 361; counter++) {
  circleX = this.ball.x + this.ball.radius*Math.cos(Math.PI*counter/180);
  circleY = this.ball.y + this.ball.radius*Math.sin(Math.PI*counter/180);
  this.checkBrickCollision(circleX, circleY);
}
```
## Event Handling

The event handling written into the game is responsible for beginning the game, pausing the game, and controlling the paddle.

```javascript
toggleGamePause(key) {
  //handling beginning of game and pause
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
//handling paddle controls
window.addEventListener('keydown', (e) => {
  switch(e.key) {
    case "ArrowRight":
    this.paddleX += 20;
    break;
    case "ArrowLeft":
    this.paddleX -= 20;
  }
});
```

## Recursive Calls

Any functions that needed to be continually called were implemented recursively, such as for redrawing the frame and giving bricks power ups.

The frame needed to continually be drawn until the game had ended:
```javascript
drawFrame () {
  if (!this.gamePaused && this.gameStarted ) {
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
}...
```
The power up are given to random bricks, and if a brick already has a power up, we want to call the givePowerUp function again.

```javascript
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
```

## Future Implementations
 I plan on adding a feature that allows the user to fire bullets at the bricks in order to destroy them, as well as a high score.
