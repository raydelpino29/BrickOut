const Game = require("./game.js");
const Bricks = require('./brick.js');
const Paddle = require('./paddle.js');


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
