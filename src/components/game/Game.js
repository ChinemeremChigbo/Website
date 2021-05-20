import React from 'react';
import './Game.scss';
import $ from 'jquery';
import { Link, Redirect, useHistory } from 'react-router-dom';

export default function Game() {
  $(function () {
    let canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d');
    let screenHeight = $(window).height();
    let screenWidth = $(window).width();

    let navigateOnce = true;
    let screenSizePadding = 4000;
    canvas.width = 1880 + screenSizePadding;
    canvas.height = 700 + screenSizePadding;
    let x = canvas.width / 2,
      y = canvas.height / 2,
      xSlow = canvas.width / 2,
      ySlow = canvas.height / 2,
      velY = 0,
      velX = 0,
      maxSpeedX = 3,
      maxSpeedY = 2,
      speedIncrement = 0.1,
      friction = 0.99,
      backgroundMovementX = true,
      backgroundMovementY = true,
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
    var moveOnce = true;
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

    document.body.addEventListener('keydown', function (e) {
      keys[e.key] = true;
    });
    document.body.addEventListener('keyup', function (e) {
      keys[e.key] = false;
    });
    // document.body.addEventListener(
    //   'touchstart',
    //   function (e) {
    //     var mousePos = getMousePos(canvas, e);
    //     if (isInside(mousePos, rectRight)) {
    //       keys['ArrowRight'] = true;
    //     }
    //     if (isInside(mousePos, rectLeft)) {
    //       keys['ArrowLeft'] = true;
    //     }
    //     if (isInside(mousePos, rectUp)) {
    //       keys['ArrowUp'] = true;
    //     }
    //     if (isInside(mousePos, rectDown)) {
    //       keys['ArrowDown'] = true;
    //     }
    //   },
    //   false
    // );
    // document.body.addEventListener(
    //   'touchend',
    //   function (e) {
    //     var mousePos = getMousePos(canvas, e);
    //     alert(mousePos);
    //     if (isInside(mousePos, rectRight)) {
    //       keys['ArrowRight'] = false;
    //     }
    //     if (isInside(mousePos, rectLeft)) {
    //       keys['ArrowLeft'] = false;
    //     }
    //     if (isInside(mousePos, rectUp)) {
    //       keys['ArrowUp'] = false;
    //     }
    //     if (isInside(mousePos, rectDown)) {
    //       keys['ArrowDown'] = false;
    //     }
    //   },
    //   false
    // );
    var touchStartPositionY;
    var touchStartPositionX;
    $(document).bind('touchstart', function (e) {
      touchStartPositionY = e.originalEvent.touches[0].clientY;
    });
    $(document).bind('touchend', function (e) {
      var touchEndPositionY = e.originalEvent.changedTouches[0].clientY;
      if (touchStartPositionY > touchEndPositionY + 5) {
        if (velY > -maxSpeedY) {
          velY += Math.floor(((touchEndPositionY - touchStartPositionY) / screenHeight) * 8);
        }
      } else if (touchStartPositionY < touchEndPositionY - 5) {
        if (velY < maxSpeedY) {
          velY += Math.floor(((touchEndPositionY - touchStartPositionY) / screenHeight) * 8);
        }
      }
    });
    $(document).bind('touchstart', function (e) {
      touchStartPositionX = e.originalEvent.touches[0].clientX;
    });

    $(document).bind('touchend', function (e) {
      var touchEndPositionX = e.originalEvent.changedTouches[0].clientX;
      if (touchStartPositionX > touchEndPositionX + 5) {
        if (velX < maxSpeedX) {
          velX += Math.floor(((touchEndPositionX - touchStartPositionX) / screenHeight) * 8);
        }
      } else if (touchStartPositionX < touchEndPositionX - 5) {
        if (velX > -maxSpeedX) {
          velX += Math.floor(((touchEndPositionX - touchStartPositionX) / screenHeight) * 8);
        }
      }
    });
    // canvas.addEventListener(
    //   'click',
    //   function (e) {
    //     var mousePos = getMousePos(canvas, e);
    //     debugger;
    //     if (isInside(mousePos, rect)) {
    //       lastDownTarget = e.target;
    //       keys['ArrowRight'] = true;
    //     }
    //   },
    //   false
    // );
    // canvas.addEventListener(
    //   'click',
    //   function (evt) {
    //     var mousePos = getMousePos(canvas, evt);
    //     debugger;
    //     if (isInside(mousePos, rect)) {
    //       alert('clicked inside rect');
    //     } else {
    //       alert('clicked outside rect');
    //     }
    //   },
    //   false
    // );
    function getMousePos(canvas, event) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }
    function isInside(pos, rect) {
      return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y;
    }

    var rectUp = {
      x: 0,
      y: 0,
      width: screenWidth,
      height: screenHeight / 4,
    };
    var rectDown = {
      width: screenWidth,
      height: screenHeight / 4,
      x: 0,
      y: screenHeight - rectUp.height,
    };
    var rectRight = {
      x: screenWidth - screenWidth / 2,
      y: rectUp.height,
      width: screenWidth / 2,
      height: screenHeight - rectUp.height - rectDown.height,
    };
    var rectLeft = {
      x: 0,
      y: rectUp.height,
      width: screenWidth / 2,
      height: screenHeight - rectUp.height - rectDown.height,
    };

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
      if (backgroundMovementX) {
        xSlow += velX * 0.5;
      }
      if (backgroundMovementY) {
        ySlow += velY * 0.5;
      }

      if (x >= canvas.width - screenSizePadding / 2) {
        x = canvas.width - screenSizePadding / 2;
        backgroundMovementX = false;
      } else if (x <= screenSizePadding / 2) {
        x = screenSizePadding / 2;
        backgroundMovementX = false;
      } else {
        backgroundMovementX = true;
      }

      if (y > canvas.height - screenSizePadding / 2) {
        y = canvas.height - screenSizePadding / 2;
        backgroundMovementY = false;
      } else if (y <= screenSizePadding / 2) {
        y = screenSizePadding / 2;
        backgroundMovementY = false;
      } else {
        backgroundMovementY = true;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.width);
      var Background = new Image();
      Background.src = 'Background.png';
      var MiddleGround = new Image();
      MiddleGround.src = 'MiddleGround.png';
      var GameBackground = new Image();
      GameBackground.src = 'GameBackground.png';
      ctx.drawImage(Background, screenWidth / 2 - Background.width / 2, screenHeight / 2 - Background.height / 2);
      // ctx.fillStyle = '#0d1a20';
      // ctx.fillRect(
      //   canvas.width / 2 - x - GameBackground.width / 2 + screenWidth / 2 + GameBackground.width - 10,
      //   canvas.height / 2 - y - GameBackground.height / 2 + screenHeight / 2,
      //   2500,
      //   GameBackground.height
      // );
      // ctx.fillRect(
      //   0,
      //   canvas.height / 2 - y - GameBackground.height / 2 + screenHeight / 2 + GameBackground.height,
      //   GameBackground.width + 2490,
      //   GameBackground.height
      // );
      // ctx.fillRect(
      //   canvas.width / 2 - x - GameBackground.width / 2 + screenWidth / 2 - GameBackground.width,
      //   canvas.height / 2 - y - GameBackground.height / 2 + screenHeight / 2,
      //   GameBackground.width,
      //   GameBackground.height
      // );
      // ctx.fillRect(
      //   0,
      //   canvas.height / 2 - y - GameBackground.height / 2 + screenHeight / 2 - GameBackground.height,
      //   GameBackground.width + 2490,
      //   GameBackground.height
      // );
      ctx.drawImage(
        MiddleGround,
        canvas.width / 2 - xSlow - MiddleGround.width / 2 + screenWidth / 2,
        canvas.height / 2 - ySlow - MiddleGround.height / 2 + screenHeight / 2
      );
      ctx.drawImage(
        GameBackground,
        canvas.width / 2 - x - GameBackground.width / 2 + screenWidth / 2,
        canvas.height / 2 - y - GameBackground.height / 2 + screenHeight / 2
      );
      // if (screenWidth < 1024) {
      //   ctx.rect(rectUp.x, rectUp.y, rectUp.width, rectUp.height);
      //   ctx.rect(rectDown.x, rectDown.y, rectDown.width, rectDown.height);
      //   ctx.rect(rectRight.x, rectRight.y, rectRight.width, rectRight.height);
      //   ctx.rect(rectLeft.x, rectLeft.y, rectLeft.width, rectLeft.height);
      //   ctx.fillStyle = 'rgba(225,225,225,0.5)';
      //   ctx.fill();
      //   ctx.stroke();
      //   ctx.closePath();
      // }
      //left portal
      if (
        x < canvas.width / 2 - 939 &&
        y > canvas.height / 2 - 60 &&
        y < canvas.height / 2 + 20 &&
        navigateOnce === true
      ) {
        navigateOnce = false;
        window.location.href = '/';
      }
      //right portal (Contact)
      if (
        x > canvas.width / 2 + 939 &&
        y > canvas.height / 2 - 40 &&
        y < canvas.height / 2 + 40 &&
        navigateOnce === true
      ) {
        navigateOnce = false;
        window.location.href = '/contact';
      }
      //bottom portal (About)
      if (
        x > canvas.width / 2 + 105 &&
        x < canvas.width / 2 + 185 &&
        y > canvas.height / 2 + 349 &&
        navigateOnce === true
      ) {
        navigateOnce = false;
        window.location.href = '/about';
      }
      //top portal (Experience)
      if (
        x > canvas.width / 2 - 15 &&
        x < canvas.width / 2 + 70 &&
        y < canvas.height / 2 - 349 &&
        navigateOnce === true
      ) {
        navigateOnce = false;
        window.location.href = '/experience';
      }
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
      const swimToIdleThreshold = 0.8;
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
