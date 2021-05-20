import React, { useContext } from 'react';
import './Game.scss';
import $ from 'jquery';
import { Link, Redirect, useHistory } from 'react-router-dom';
import './style.scss';

export default function Game() {
  $(function () {
    //Declares the game canvas
    let canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d');
    //Gets users screensize
    let screenHeight = $(window).height();
    let screenWidth = $(window).width();
    /*Prevents the portal page changing from occuring more than once
    (really, twice in practice due to game performance) if turned off
    page loading is even slower since it is requested too many times
    */
    let navigateOnce = true;
    //Makes the actual canvas huge, but the effective canvas small (so users can't easily see the edge of the canvas)
    let screenSizePadding = 4000;
    //Canvas sizing
    canvas.width = 1880 + screenSizePadding;
    canvas.height = 700 + screenSizePadding;
    let x = canvas.width / 2,
      y = canvas.height / 2,
      //Movement for the parallax background
      xSlow = canvas.width / 2,
      ySlow = canvas.height / 2,
      //To ramp up and slow down character movement
      velY = 0,
      velX = 0,
      //Speed cap for x and y directions
      maxSpeedX = 3,
      maxSpeedY = 2,
      //Speed increase factor
      speedIncrement = 0.1,
      /*Allows character to slow down instead of stopping immediately
      the lower, the faster the stopping*/
      friction = 0.95,
      //Used to stop the back parallax movement at the same time as the front
      backgroundMovementX = true,
      backgroundMovementY = true,
      //To collect which key was pressed
      keys = [];
    //Character Spritesheet
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
    //Detects when key is first pressed and released for player movement
    document.body.addEventListener('keydown', function (e) {
      keys[e.key] = true;
    });
    document.body.addEventListener('keyup', function (e) {
      keys[e.key] = false;
    });
    //Adds Swipe touch functionality for mobile
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

    function Update() {
      requestAnimationFrame(Update);
      //Updates sprite each frame
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
      //Increases x and y velocity in accordance to friction
      velY *= friction;
      y += velY;

      velX *= friction;
      x += velX;
      //Slower, parallax movement for background
      if (backgroundMovementX) {
        xSlow += velX * 0.5;
      }
      if (backgroundMovementY) {
        ySlow += velY * 0.5;
      }

      //Stops movement at effective canvas limits
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
      /*Drawing the Background, Midground, and Foreground for the game
      these are positioned in the center of the users screen and need to move in the opposite direction that
      the user presses (the x and y in the 2nd and 3rd draw image) the first draw image is stationary.
      Keep in mind, that the character does not actually move, just the background and foreground.
      */
      var Background = new Image();
      Background.src = 'Background.png';
      var Midground = new Image();
      Midground.src = 'Midground.png';
      var Foreground = new Image();
      Foreground.src = 'Foreground.png';
      ctx.drawImage(Background, screenWidth / 2 - Background.width / 2, screenHeight / 2 - Background.height / 2);
      ctx.drawImage(
        Midground,
        canvas.width / 2 - xSlow - Midground.width / 2 + screenWidth / 2,
        canvas.height / 2 - ySlow - Midground.height / 2 + screenHeight / 2
      );
      ctx.drawImage(
        Foreground,
        canvas.width / 2 - x - Foreground.width / 2 + screenWidth / 2,
        canvas.height / 2 - y - Foreground.height / 2 + screenHeight / 2
      );
      //Left portal (Home)
      if (
        x < canvas.width / 2 - 939 &&
        y > canvas.height / 2 - 60 &&
        y < canvas.height / 2 + 20 &&
        navigateOnce === true
      ) {
        navigateOnce = false;
        window.location.href = '/';
      }
      //Right portal (Contact)
      if (
        x > canvas.width / 2 + 939 &&
        y > canvas.height / 2 - 40 &&
        y < canvas.height / 2 + 40 &&
        navigateOnce === true
      ) {
        navigateOnce = false;
        window.location.href = '/contact';
      }
      //Bottom portal (About)
      if (
        x > canvas.width / 2 + 105 &&
        x < canvas.width / 2 + 185 &&
        y > canvas.height / 2 + 349 &&
        navigateOnce === true
      ) {
        navigateOnce = false;
        window.location.href = '/about';
      }
      //Top portal (Experience)
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

    //Function to draw consecutive character frames
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
  // Player following with fishies
  // const secondaryCursor = React.useRef(null);
  // const mainCursor = React.useRef(null);
  // const positionRef = React.useRef({
  //   mouseX: 0,
  //   mouseY: 0,
  //   destinationX: 0,
  //   destinationY: 0,
  //   distanceX: 0,
  //   distanceY: 0,
  //   key: -1,
  // });

  // React.useEffect(() => {
  //   document.addEventListener('mousemove', (event) => {
  //     const { clientX, clientY } = event;

  //     const mouseX = clientX;
  //     const mouseY = clientY;

  //     positionRef.current.mouseX = mouseX - secondaryCursor.current.clientWidth / 2;
  //     positionRef.current.mouseY = mouseY - secondaryCursor.current.clientHeight / 2;
  //     mainCursor.current.style.transform = `translate3d(${mouseX - mainCursor.current.clientWidth / 2}px, ${
  //       mouseY - mainCursor.current.clientHeight / 2
  //     }px, 0)`;
  //   });

  //   return () => {};
  // }, []);

  // React.useEffect(() => {
  //   const followMouse = () => {
  //     positionRef.current.key = requestAnimationFrame(followMouse);
  //     const { mouseX, mouseY, destinationX, destinationY, distanceX, distanceY } = positionRef.current;
  //     if (!destinationX || !destinationY) {
  //       positionRef.current.destinationX = mouseX;
  //       positionRef.current.destinationY = mouseY;
  //     } else {
  //       positionRef.current.distanceX = (mouseX - destinationX) * 0.02;
  //       positionRef.current.distanceY = (mouseY - destinationY) * 0.02;
  //       if (Math.abs(positionRef.current.distanceX) + Math.abs(positionRef.current.distanceY) < 0.01) {
  //         positionRef.current.destinationX = mouseX;
  //         positionRef.current.destinationY = mouseY;
  //       } else {
  //         positionRef.current.destinationX += distanceX;
  //         positionRef.current.destinationY += distanceY;
  //       }
  //     }
  //     secondaryCursor.current.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0)`;
  //   };
  //   followMouse();
  // }, []);

  return (
    <div>
      <canvas id="canvas" className="canvas"></canvas>
      {/* <div className="main-cursor " ref={mainCursor}>
        <div className="main-cursor-background"></div>
      </div>
      <div className="secondary-cursor" ref={secondaryCursor}>
        <div className="cursor-background"></div>
      </div> */}
    </div>
  );
}
