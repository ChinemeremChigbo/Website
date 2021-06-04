import React from 'react';
import './Game.scss';
import $ from 'jquery';

export default function Game() {
  $(function () {
    //Canvas Properties
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const screenSizePadding = 500;
    canvas.width = 1880 + screenSizePadding;
    canvas.height = 700 + screenSizePadding;
    let screenHeight = $(window).height();
    let screenWidth = $(window).width();
    let navigateOnce = true;
    //Fish Properties
    let Fish11X = -100;
    let Fish11Y = -100;
    let Fish11VelocityX = 0;
    let Fish11VelocityY = 0;
    const Fish11StartX = -100;
    const Fish11StartY = -100;
    const Fish11MaxSpeedX = 0.5;
    const Fish11MaxSpeedY = 0.5;
    const FishSpeedIncrement = 0.1;
    const Fish11Friction = 0.99;
    //Player Properties
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let xSlow = canvas.width / 2;
    let ySlow = canvas.height / 2;
    let velY = 0;
    let velX = 0;
    const maxSpeedX = 3;
    const maxSpeedY = 3;
    const speedIncrement = 0.1;
    const friction = 0.99;
    let backgroundMovementX = true;
    let backgroundMovementY = true;
    let NormalisePlayerX = 0;
    let NormalisePlayerY = 0;
    const keys = [];
    const PlayerFast = [];
    const FastFrame = 0;
    const PlayerHurt = [];
    const HurtFrame = 0;
    const PlayerIdle = [];
    let IdleFrame = 0;
    const PlayerRush = [];
    const RushFrame = 0;
    const PlayerSwimming = [];
    let SwimmingFrame = 0;
    const Background = new Image();
    Background.src = 'Background.png';
    const MiddleGround = new Image();
    MiddleGround.src = 'MiddleGround.png';
    const GameBackground = new Image();
    GameBackground.src = 'GameBackground.png';
    const Fish11 = new Image();
    Fish11.src = 'Fish11.png';
    const Fast = [
      './player/Fast/1.png',
      './player/Fast/2.png',
      './player/Fast/3.png',
      './player/Fast/4.png',
      './player/Fast/5.png',
    ];
    const Hurt = [
      './player/Hurt/1.png',
      './player/Hurt/2.png',
      './player/Hurt/3.png',
      './player/Hurt/4.png',
      './player/Hurt/5.png',
    ];
    const Idle = [
      './player/Idle/1.png',
      './player/Idle/2.png',
      './player/Idle/3.png',
      './player/Idle/4.png',
      './player/Idle/5.png',
      './player/Idle/6.png',
    ];
    const Rush = [
      './player/Rush/1.png',
      './player/Rush/2.png',
      './player/Rush/3.png',
      './player/Rush/4.png',
      './player/Rush/5.png',
      './player/Rush/6.png',
      './player/Rush/7.png',
    ];
    const Swimming = [
      './player/Swimming/1.png',
      './player/Swimming/2.png',
      './player/Swimming/3.png',
      './player/Swimming/4.png',
      './player/Swimming/5.png',
      './player/Swimming/6.png',
      './player/Swimming/7.png',
    ];

    //Desktop key detection
    document.body.addEventListener('keydown', function (e) {
      keys[e.key] = true;
    });
    document.body.addEventListener('keyup', function (e) {
      keys[e.key] = false;
    });

    //Mobile press detection
    let touchStartPositionX;
    let touchStartPositionY;
    let touchStartPositionXRelative;
    let touchStartPositionYRelative;
    //Mobile initial touch detection
    function Touch(touchtype) {
      $(document).on(touchtype, function (e) {
        touchStartPositionX = e.originalEvent.touches[0].clientX;
        touchStartPositionY = e.originalEvent.touches[0].clientY;
        touchStartPositionXRelative = screenWidth / 2 - touchStartPositionX;
        touchStartPositionYRelative = screenHeight / 2 - touchStartPositionY;
        NormalisePlayerX =
          touchStartPositionXRelative /
          Math.sqrt(
            touchStartPositionXRelative * touchStartPositionXRelative +
              touchStartPositionYRelative * touchStartPositionYRelative
          );
        NormalisePlayerY =
          touchStartPositionYRelative /
          Math.sqrt(
            touchStartPositionXRelative * touchStartPositionXRelative +
              touchStartPositionYRelative * touchStartPositionYRelative
          );
      });
    }
    Touch('touchstart');
    Touch('touchmove');

    //Slow Velocity on mobile touch release
    $(document).on('touchend', function (e) {
      NormalisePlayerX = 0;
      NormalisePlayerY = 0;
    });

    function Update() {
      //Recursively refresh in accordnce to device speed
      requestAnimationFrame(Update);
      //Frequently Update Screen Size
      screenHeight = $(window).height();
      screenWidth = $(window).width();
      //SpriteSheet
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

      //Mobile Movement
      if (Math.abs(velX) < Math.abs(maxSpeedX)) {
        velX -= NormalisePlayerX * speedIncrement;
      }
      if (Math.abs(velY) < Math.abs(maxSpeedY)) {
        velY -= NormalisePlayerY * speedIncrement;
      }
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

      //Slow upon release
      velY *= friction;
      y += velY;

      velX *= friction;
      x += velX;

      //Parallax background
      if (backgroundMovementX) {
        xSlow += velX * 0.5;
      }
      if (backgroundMovementY) {
        ySlow += velY * 0.5;
      }

      //Stop when player hits edge in x-axis
      if (x >= canvas.width - screenSizePadding / 2) {
        x = canvas.width - screenSizePadding / 2;
        backgroundMovementX = false;
      } else if (x <= screenSizePadding / 2) {
        x = screenSizePadding / 2;
        //Stop parallax background x-axis
        backgroundMovementX = false;
      } else {
        backgroundMovementX = true;
      }

      //Stop when player hits edge in y-axis
      if (y > canvas.height - screenSizePadding / 2) {
        y = canvas.height - screenSizePadding / 2;
        backgroundMovementY = false;
      } else if (y <= screenSizePadding / 2) {
        y = screenSizePadding / 2;
        //Stop parallax background y-axis
        backgroundMovementY = false;
      } else {
        backgroundMovementY = true;
      }

      const Fish11DestinationX = Math.floor(0 + x - canvas.width / 2);
      const Fish11DestinationY = Math.floor(0 + y - canvas.height / 2);

      //Find vector between fish and target and convert to unit vector
      const NormaliseFishX =
        (Fish11DestinationX - Fish11StartX) /
        Math.sqrt(
          (Fish11DestinationX - Fish11StartX) * (Fish11DestinationX - Fish11StartX) +
            (Fish11DestinationY - Fish11StartY) * (Fish11DestinationY - Fish11StartY)
        );
      const NormaliseFishY =
        (Fish11DestinationY - Fish11StartY) /
        Math.sqrt(
          (Fish11DestinationX - Fish11StartX) * (Fish11DestinationX - Fish11StartX) +
            (Fish11DestinationY - Fish11StartY) * (Fish11DestinationY - Fish11StartY)
        );

      //Fish Movement
      if (Fish11X < Fish11DestinationX) {
        if (Fish11VelocityX < Fish11MaxSpeedX) {
          Fish11VelocityX += Math.abs(NormaliseFishX) * FishSpeedIncrement;
        }
      } else if (Fish11X > Fish11DestinationX) {
        if (Fish11VelocityX > -Fish11MaxSpeedX) {
          Fish11VelocityX -= Math.abs(NormaliseFishX) * FishSpeedIncrement;
        }
      }
      if (Fish11Y < Fish11DestinationY) {
        if (Fish11VelocityY < Fish11MaxSpeedY) {
          Fish11VelocityY += Math.abs(NormaliseFishY) * FishSpeedIncrement;
        }
      } else if (Fish11Y > Fish11DestinationY) {
        if (Fish11VelocityY > -Fish11MaxSpeedY) {
          Fish11VelocityY -= Math.abs(NormaliseFishY) * FishSpeedIncrement;
        }
      }

      Fish11VelocityY *= Fish11Friction;
      Fish11Y += Fish11VelocityY;

      Fish11VelocityX *= Fish11Friction;
      Fish11X += Fish11VelocityX;

      //Page Navigation Portals

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

      //Drawing images

      ctx.clearRect(0, 0, canvas.width, canvas.width);

      /*Drawing the Background, Midground, and Foreground for the game
      these are positioned in the center of the users screen and need to move in the opposite direction that
      the user presses (the x and y in the 2nd and 3rd draw image) the first draw image is stationary.
      Keep in mind, that the character does not actually move, just the background and foreground.
      */
      ctx.drawImage(
        Background,
        Math.floor(screenWidth / 2 - Background.width / 2),
        Math.floor(screenHeight / 2 - Background.height / 2)
      );

      ctx.drawImage(
        MiddleGround,
        Math.floor(canvas.width / 2 - xSlow - MiddleGround.width / 2 + screenWidth / 2),
        Math.floor(canvas.height / 2 - ySlow - MiddleGround.height / 2 + screenHeight / 2)
      );
      ctx.drawImage(
        GameBackground,
        Math.floor(canvas.width / 2 - x - GameBackground.width / 2 + screenWidth / 2),
        Math.floor(canvas.height / 2 - y - GameBackground.height / 2 + screenHeight / 2)
      );
      // ctx.drawImage(
      //   Fish11,
      //   Math.floor(canvas.width / 2 - x - Fish11.width / 2 + screenWidth / 2 + Fish11X),
      //   Math.floor(canvas.height / 2 - y - Fish11.height / 2 + screenHeight / 2 + Fish11Y)
      // );
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
      //Changing player sprites based off of movement andspeed
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
