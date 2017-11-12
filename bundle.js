/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Paddle {
  constructor(context) {
    this.paddleX = 300;
    this.paddleY = 280;
    this.paddleHeight = 5;
    this.paddleWidth = 100;
    this.context = context;
    window.addEventListener('keydown', (e) => {
      switch(e.key) {
        case "ArrowRight":
        this.paddleX += 20;
        break;
        case "ArrowLeft":
        this.paddleX -= 20;
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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
  }
}

module.exports = Ball;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

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
        }
      });
    });
  }
}

module.exports = Bricks;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(4);
const Bricks = __webpack_require__(2);
const Paddle = __webpack_require__(0);


document.addEventListener('DOMContentLoaded', () => {
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  const bricks = new Bricks(context);
  const paddle = new Paddle(context);
  let bricksArr = bricks.createBricks();
  const game = new Game(context, bricksArr, canvas);
  game.addPowerUps();
  requestAnimationFrame(game.drawFrame);
});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Paddle = __webpack_require__(0);
const Ball = __webpack_require__(1);
const Bricks = __webpack_require__(2);

class Game {
  constructor(context, bricksArr, canvas) {
    this.context = context;
    this.paddle = new Paddle(context);
    this.ball = new Ball(context);
    this.bricks = new Bricks(context);
    this.bricksArr = bricksArr;
    this.powerUps = ["paddleSizeUp", "paddleSizeDown", "ballSpeedUp", "ballSpeedDown"];
    this.score = 0;
    this.gamePaused = false;
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
    if (!this.gamePaused) {
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
}

module.exports = Game;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map