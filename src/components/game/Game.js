import React from 'react';
import './Game.scss';
import $ from 'jquery';
import { StopScreenShare } from '@material-ui/icons';

export default function Game() {
  $(function () {
    //Canvas Properties
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let screenWidth = $(window).width();
    let screenHeight = $(window).height();
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    let navigateOnce = true;
    let goFullScreenOnce = true;
    //Cross-function properties
    let x = 0;
    let y = 0;
    let xSlow = 0;
    let ySlow = 0;
    let velY = 0;
    let velX = 0;
    let NormalisePlayerX = 0;
    let NormalisePlayerY = 0;
    const maxSpeedX = 3;
    const maxSpeedY = 3;
    const speedIncrement = 0.1;
    const friction = 0.99;

    function AnimateSpritesheet(arr, x, y, scalex, scaley, rotation, framerate) {
      if (!framerate) {
        framerate = 1;
      }
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scalex, scaley);
      ctx.rotate((rotation * Math.PI) / 180);
      if (!!arr[Math.round(Date.now() / framerate) % arr.length]) {
        ctx.drawImage(
          arr[Math.round(Date.now() / framerate) % arr.length],
          -(arr[Math.round(Date.now() / framerate) % arr.length].width / 2),
          -(arr[Math.round(Date.now() / framerate) % arr.length].height / 2),
          arr[Math.round(Date.now() / framerate) % arr.length].width,
          arr[Math.round(Date.now() / framerate) % arr.length].height
        );
      }
      ctx.restore();
    }
    //Go FullScreen on mobile
    $(document).on('touchend', function (e) {
      NormalisePlayerX = 0;
      NormalisePlayerY = 0;

      if (goFullScreenOnce) {
        if (canvas.requestFullScreen) canvas.requestFullScreen();
        else if (canvas.webkitRequestFullScreen) canvas.webkitRequestFullScreen();
        else if (canvas.mozRequestFullScreen) canvas.mozRequestFullScreen();
        goFullScreenOnce = false;
      }
    });

    canvas.addEventListener('click', function (evt) {});

    function TouchInput() {
      //Mobile press detection
      let touchStartPositionX;
      let touchStartPositionY;
      let touchStartPositionXRelative;
      let touchStartPositionYRelative;
      //Mobile initial touch detection
      function TouchandDrag(touchtype) {
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
      TouchandDrag('touchstart');
      TouchandDrag('touchmove');
      //Slow Velocity on mobile touch release
      $(document).on('touchend', function (e) {
        NormalisePlayerX = 0;
        NormalisePlayerY = 0;
      });
    }

    TouchInput();
    let clickMovement = false;
    function ClickInput() {
      let clickStartPositionX;
      let clickStartPositionY;
      let clickStartPositionXRelative;
      let clickStartPositionYRelative;
      $(document).on('mousedown', function (e) {
        clickMovement = true;
        $(document).on('mousemove', function (e) {
          if (clickMovement === true) {
            clickStartPositionX = window.event.clientX;
            clickStartPositionY = window.event.clientY;
            clickStartPositionXRelative = screenWidth / 2 - clickStartPositionX;
            clickStartPositionYRelative = screenHeight / 2 - clickStartPositionY;
            NormalisePlayerX =
              clickStartPositionXRelative /
              Math.sqrt(
                clickStartPositionXRelative * clickStartPositionXRelative +
                  clickStartPositionYRelative * clickStartPositionYRelative
              );
            NormalisePlayerY =
              clickStartPositionYRelative /
              Math.sqrt(
                clickStartPositionXRelative * clickStartPositionXRelative +
                  clickStartPositionYRelative * clickStartPositionYRelative
              );
          }
        });
      });
    }
    ClickInput();
    $(document).on('mouseup', function (e) {
      NormalisePlayerX = 0;
      NormalisePlayerY = 0;
      clickMovement = false;
    });

    //Keyboard Input Propertoes
    const keys = [];

    function KeyInput() {
      //Desktop key detection
      document.body.addEventListener('keydown', function (e) {
        keys[e.key] = true;
      });
      document.body.addEventListener('keyup', function (e) {
        keys[e.key] = false;
      });
    }
    KeyInput();

    //Background Properties
    let backgroundMovementX = true;
    let backgroundMovementY = true;
    const Background = new Image();
    Background.src = 'Background.png';
    const MiddleGround = new Image();
    MiddleGround.src = 'MiddleGround.png';
    const GameBackground = new Image();
    GameBackground.src = 'GameBackground.png';

    function BackgroundMovement() {
      //Frequently Update Screen Size
      screenHeight = $(window).height();
      screenWidth = $(window).width();
      canvas.width = screenWidth;
      canvas.height = screenHeight;
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
      //Slow movement upon key/touch input release
      velY *= friction;
      y += velY;

      velX *= friction;
      x += velX;

      //Slower Parallax background
      if (backgroundMovementX) {
        xSlow += velX * 0.5;
      }
      if (backgroundMovementY) {
        ySlow += velY * 0.5;
      }

      //Page Navigation Portals

      //left portal
      if (x < -939 && y > -60 && y < +20 && navigateOnce === true) {
        navigateOnce = false;
        window.location.href = '/';
      }
      //right portal (Contact)
      if (x > 939 && y > -40 && y < +40 && navigateOnce === true) {
        navigateOnce = false;
        window.location.href = '/contact';
      }
      //bottom portal (About)
      if (x > 105 && x < 185 && y > 359 && navigateOnce === true) {
        navigateOnce = false;
        window.location.href = '/about';
      }
      //top portal (Experience)
      if (x > 15 && x < 70 && y < -359 && navigateOnce === true) {
        navigateOnce = false;
        window.location.href = '/experience';
      }

      /*Drawing the Background, Midground, and Foreground for the game
      these are positioned in the center of the users screen and need to move in the opposite direction that
      the user presses (the x and y in the 2nd and 3rd draw image) the first draw image is stationary.
      Keep in mind, that the character does not actually move, just the background and foreground.
      */
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        Background,
        Math.floor(canvas.width / 2 - Background.width / 2),
        Math.floor(canvas.height / 2 - Background.height / 2)
      );
      ctx.drawImage(
        MiddleGround,
        Math.floor(canvas.width / 2 - xSlow - MiddleGround.width / 2),
        Math.floor(canvas.height / 2 - ySlow - MiddleGround.height / 2)
      );
      ctx.drawImage(
        GameBackground,
        Math.floor(canvas.width / 2 - x - GameBackground.width / 2),
        Math.floor(canvas.height / 2 - y - GameBackground.height / 2)
      );
      if (screenWidth > 1200) {
        //Don't draw on phones and tablets
        ctx.fillStyle = '#0d1a20';
        //Top Rect
        ctx.fillRect(
          Math.floor(canvas.width / 2 - x - GameBackground.width / 2),
          Math.floor(canvas.height / 2 - y - GameBackground.height / 1.5),
          Math.floor(GameBackground.width),
          Math.floor(GameBackground.height / 4)
        ); // Bottom Rect
        ctx.fillRect(
          Math.floor(canvas.width / 2 - x - GameBackground.width / 2),
          Math.floor(canvas.height / 2 - y + GameBackground.height / 2.5),
          Math.floor(GameBackground.width),
          Math.floor(GameBackground.height / 4)
        );
        ctx.fillRect(
          Math.floor(canvas.width / 2 - x - GameBackground.width),
          Math.floor(canvas.height / 2 - y - GameBackground.height / 1.5),
          Math.floor(GameBackground.width / 1.65),
          Math.floor(GameBackground.height * 1.317)
        );
        ctx.fillRect(
          Math.floor(canvas.width / 2 - x + GameBackground.width / 2.35),
          Math.floor(canvas.height / 2 - y - GameBackground.height / 1.5),
          Math.floor(GameBackground.width / 1.75),
          Math.floor(GameBackground.height * 1.317)
        );
      }
      //Recursively redraw frame in accordance to device speed
      requestAnimationFrame(BackgroundMovement);
    }
    BackgroundMovement();

    //Player Sprites

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

    function PlayerMovement() {
      //Stop when player hits edge in x-axis
      if (x >= 940) {
        x = 940;
        backgroundMovementX = false;
      } else if (x <= -940) {
        x = -940;
        //Stop parallax background x-axis
        backgroundMovementX = false;
      } else {
        backgroundMovementX = true;
      }

      //Stop when player hits edge in y-axis
      if (y > 360) {
        y = 360;
        backgroundMovementY = false;
      } else if (y <= -360) {
        y = -360;
        //Stop parallax background y-axis
        backgroundMovementY = false;
      } else {
        backgroundMovementY = true;
      }
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
      //Changing player sprites based off of movement andspeed
      const swimToIdleThreshold = 0.8;
      if (velX > swimToIdleThreshold) {
        AnimateSpritesheet(PlayerSwimming, canvas.width / 2, canvas.height / 2, 1.5, 1.5, 0, 100);
        if (SwimmingFrame < Swimming.length - 1) {
          SwimmingFrame++;
        }
      } else if (velX < -swimToIdleThreshold) {
        AnimateSpritesheet(PlayerSwimming, canvas.width / 2, canvas.height / 2, -1.5, 1.5, 0, 100);
        if (SwimmingFrame < Swimming.length - 1) {
          SwimmingFrame++;
        }
      } else if (0 < velX <= swimToIdleThreshold) {
        AnimateSpritesheet(PlayerIdle, canvas.width / 2, canvas.height / 2, -1.5, 1.5, 0, 150);
        if (IdleFrame < Idle.length - 1) {
          IdleFrame++;
        }
      } else {
        AnimateSpritesheet(PlayerIdle, canvas.width / 2, canvas.height / 2, 1.5, 1.5, 0, 150);
        if (IdleFrame < Idle.length - 1) {
          IdleFrame++;
        }
      }

      //Recursively redraw frame in accordance to device speed
      requestAnimationFrame(PlayerMovement);
    }
    PlayerMovement();

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
    const Fish11 = new Image();
    Fish11.src = 'Fish11.png';

    function FishMovement() {
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

      // ctx.drawImage(
      //   Fish11,
      //   Math.floor(canvas.width / 2 - x - Fish11.width / 2 + screenWidth / 2 + Fish11X),
      //   Math.floor(canvas.height / 2 - y - Fish11.height / 2 + screenHeight / 2 + Fish11Y)
      // );

      //Recursively redraw frame in accordance to device speed
      requestAnimationFrame(FishMovement);
    }
    FishMovement();
  });
  return (
    <div className="gameBackground">
      <div className="game">
        <canvas className="canvas" id="canvas"></canvas>
      </div>
    </div>
  );
}
