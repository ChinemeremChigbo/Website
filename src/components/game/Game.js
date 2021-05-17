import React from 'react';
import './Game.scss';
import $ from 'jquery';

export default function Game() {
  $(function () {
    let canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d');

    canvas.width = 100;
    canvas.height = 500;

    let x = 150,
      y = 150,
      velY = 0,
      velX = 0,
      speedX = 1.5,
      speedY = 0.5,
      friction = 0.99,
      radius = 10,
      keys = [];

    function Update() {
      requestAnimationFrame(Update);
      //Up or W
      if (keys[38] || keys[87]) {
        if (velY > -speedY) {
          velY--;
        }
      }
      //Down or S
      if (keys[40] || keys[83]) {
        if (velY < speedY) {
          velY++;
        }
      }
      //Right or D
      if (keys[39] || keys[68]) {
        if (velX < speedX) {
          velX++;
        }
      }
      //Left or A
      if (keys[37] || keys[65]) {
        if (velX > -speedX) {
          velX--;
        }
      }

      velY *= friction;
      y += velY;
      velX *= friction;
      x += velX;

      if (x >= canvas.width - radius) {
        x = canvas.width - radius;
      } else if (x <= radius) {
        x = radius;
      }

      if (y > canvas.height - radius) {
        y = canvas.height - radius;
      } else if (y <= radius) {
        y = radius;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    Update();

    document.body.addEventListener('keydown', function (e) {
      keys[e.keyCode] = true;
      console.log(e);
      console.log(e.keyCode);
    });
    document.body.addEventListener('keyup', function (e) {
      keys[e.keyCode] = false;
    });
  });
  return (
    <div className="game">
      <canvas id="canvas"></canvas>
    </div>
  );
}
