import React from 'react';
import './Game.scss';
import $ from 'jquery';

export default function Game() {
  $(function () {
    let canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d');
    let screenHeight = $(window).height();
    let screenWidth = $(window).width();
    document.body.addEventListener('keydown', function (e) {
      keys[e.key] = true;
      // console.log(e);
    });
    document.body.addEventListener('keyup', function (e) {
      keys[e.key] = false;
      release[e.key] = true;
    });
    canvas.width = 1800;
    canvas.height = 750;

    let x = canvas.width / 2,
      y = canvas.height / 2,
      velY = 0,
      velX = 0,
      maxSpeedX = 2.5,
      maxSpeedY = 2,
      speedIncrement = 0.03,
      friction = 0.99,
      radius = 10,
      release = [],
      // boostTimeout = 1000,
      // boostReady = false,
      keys = [];

    var PlayerFast = [];
    var FastFrame = 0;
    var PlayerHurt = [];
    var HurtFrame = 0;
    var PlayerIdle = [];
    var IdleFrame = 0;
    var PlayerRush = [];
    var RushFrame = 0;
    var PlayerSwimming = [];
    var SwimmingFrame = 0;
    var Fast = [
      './player/Fast/1.png',
      './player/Fast/2.png',
      './player/Fast/3.png',
      './player/Fast/4.png',
      './player/Fast/5.png',
    ];
    var Hurt = [
      './player/Hurt/1.png',
      './player/Hurt/2.png',
      './player/Hurt/3.png',
      './player/Hurt/4.png',
      './player/Hurt/5.png',
    ];
    var Idle = [
      './player/Idle/1.png',
      './player/Idle/2.png',
      './player/Idle/3.png',
      './player/Idle/4.png',
      './player/Idle/5.png',
      './player/Idle/6.png',
    ];
    var Rush = [
      './player/Rush/1.png',
      './player/Rush/2.png',
      './player/Rush/3.png',
      './player/Rush/4.png',
      './player/Rush/5.png',
      './player/Rush/6.png',
      './player/Rush/7.png',
    ];
    var Swimming = [
      './player/Swimming/1.png',
      './player/Swimming/2.png',
      './player/Swimming/3.png',
      './player/Swimming/4.png',
      './player/Swimming/5.png',
      './player/Swimming/6.png',
      './player/Swimming/7.png',
    ];
    var once = false;
    function Update() {
      requestAnimationFrame(Update);

      PlayerFast[FastFrame] = new Image();
      PlayerFast[FastFrame].src = Fast[FastFrame];
      PlayerHurt[HurtFrame] = new Image();
      PlayerHurt[HurtFrame].src = Hurt[HurtFrame];
      PlayerIdle[IdleFrame] = new Image();
      PlayerIdle[IdleFrame].src = Idle[IdleFrame];
      PlayerRush[RushFrame] = new Image();
      PlayerRush[RushFrame].src = Rush[RushFrame];
      PlayerSwimming[SwimmingFrame] = new Image();
      PlayerSwimming[SwimmingFrame].src = Swimming[SwimmingFrame];

      //Background Movement
      //Up or W
      if (keys['ArrowUp'] || keys['w']) {
        if (velY > -maxSpeedY) {
          velY -= speedIncrement;
        }
      }
      //Down or S
      if (keys['ArrowDown'] || keys['s']) {
        if (velY < maxSpeedY) {
          velY += speedIncrement;
        }
      }
      //Right or D
      if (keys['ArrowRight'] || keys['d']) {
        if (velX < maxSpeedX) {
          velX += speedIncrement;
        }
      }
      //Left or A
      if (keys['ArrowLeft'] || keys['a']) {
        if (velX > -maxSpeedX) {
          velX -= speedIncrement;
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

      ctx.clearRect(0, 0, canvas.width, canvas.width);
      var Background = new Image();
      Background.src = 'GameBackground.png';
      ctx.drawImage(Background, -x + canvas.width / 20, -y - canvas.height / 3.5);
    }
    Update();
    function drawGif(arr, x, y, scalex, scaley, rotate, factor, changespeed) {
      if (!factor) {
        factor = 1;
      }
      if (!changespeed) {
        changespeed = 1;
      }
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scalex, scaley);
      ctx.rotate((rotate * Math.PI) / 180);
      if (!!arr[Math.round(Date.now() / changespeed) % arr.length]) {
        ctx.drawImage(
          arr[Math.round(Date.now() / changespeed) % arr.length],
          -((arr[Math.round(Date.now() / changespeed) % arr.length].width * factor) / 2),
          -((arr[Math.round(Date.now() / changespeed) % arr.length].height * factor) / 2),
          arr[Math.round(Date.now() / changespeed) % arr.length].width * factor,
          arr[Math.round(Date.now() / changespeed) % arr.length].height * factor
        );
      }
      ctx.restore();
    }

    function PlayerMovement() {
      //Changing Play Sprites Based Off of Movement and Speed
      const swimToIdleThreshold = 0.3;
      if (velX > swimToIdleThreshold) {
        drawGif(PlayerSwimming, screenWidth / 2, screenHeight / 2, 1, 1, 0, 1.5, 100);
        if (SwimmingFrame < Swimming.length - 1) {
          SwimmingFrame++;
        }
      } else if (velX < -swimToIdleThreshold) {
        drawGif(PlayerSwimming, screenWidth / 2, screenHeight / 2, -1, 1, 0, 1.5, 100);
        if (SwimmingFrame < Swimming.length - 1) {
          SwimmingFrame++;
        }
      } else if (0 < velX <= swimToIdleThreshold) {
        drawGif(PlayerIdle, screenWidth / 2, screenHeight / 2, -1, 1, 0, 1.5, 150);
        if (IdleFrame < Idle.length - 1) {
          IdleFrame++;
        }
      } else {
        drawGif(PlayerIdle, screenWidth / 2, screenHeight / 2, 1, 1, 0, 1.5, 150);
        if (IdleFrame < Idle.length - 1) {
          IdleFrame++;
        }
      }
      requestAnimationFrame(PlayerMovement);
    }
    requestAnimationFrame(PlayerMovement);
  });
  return (
    <div className="gameBackground">
      <div className="game">
        <canvas id="canvas"></canvas>
      </div>
    </div>
  );
}
