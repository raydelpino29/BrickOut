const Game = require("./game.js");
const Bricks = require('./brick.js');
const Paddle = require('./paddle.js');


document.addEventListener('DOMContentLoaded', () => {
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  const bricks = new Bricks();
  const paddle = new Paddle(context);
  const game = new Game(context);
  requestAnimationFrame(game.drawFrame);
});
