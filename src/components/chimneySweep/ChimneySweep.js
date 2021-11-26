import React from 'react';
import './ChimneySweep.scss';
import $ from 'jquery';

export default function ChimneySweep() {
  $(function () {
    //Canvas Properties
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let screenWidth = $(window).width();
    let screenHeight = $(window).height();
    canvas.width = screenWidth;
    canvas.height = screenHeight;
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
      if (screenWidth > 768) {
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

class State {
  constructor(display, actors) {
    this.display = display;
    this.actors = actors;
  }

  update(time) {
    /**
     * provide an update ID to let actors update other actors only once
     * used with collision detection
     */
    const updateId = Math.floor(Math.random() * 1000000);
    const actors = this.actors.map((actor) => {
      return actor.update(this, time, updateId);
    });
    return new State(this.display, actors);
  }
}

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  subtract(vector) {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }

  multiply(scalar) {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  dotProduct(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  get magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  get direction() {
    return Math.atan2(this.x, this.y);
  }
}

class Canvas {
  constructor(parent = document.body, width = 400, height = 400) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    parent.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
  }

  sync(state) {
    this.clearDisplay();
    this.drawActors(state.actors);
  }

  clearDisplay() {
    // opacity controls the trail effect set to 1 to remove
    this.ctx.fillStyle = 'rgba(255, 255, 255, .4)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = 'black';
    this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawActors(actors) {
    for (let actor of actors) {
      if (actor.type === 'circle') {
        this.drawCircle(actor);
      }
    }
  }

  drawCircle(actor) {
    this.ctx.beginPath();
    this.ctx.arc(actor.position.x, actor.position.y, actor.radius, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fillStyle = actor.color;
    this.ctx.fill();
  }
}

class Ball {
  constructor(config) {
    Object.assign(
      this,
      {
        id: Math.floor(Math.random() * 1000000),
        type: 'circle',
        position: new Vector(100, 100),
        velocity: new Vector(5, 3),
        radius: 25,
        color: 'blue',
        collisions: [],
      },
      config
    );
  }

  update(state, time, updateId) {
    /**
     * if slice occurs on too many elements, it starts to lag
     * collisions is an array to allow multiple collisions at once
     */
    if (this.collisions.length > 10) {
      this.collisions = this.collisions.slice(this.collisions.length - 3);
    }

    /**
     * this is the most stable solution to avoid overlap
     * but it is slightly inaccurate
     */
    for (let actor of state.actors) {
      if (this === actor || this.collisions.includes(actor.id + updateId)) {
        continue;
      }

      /**
       * check if actors collide in the next frame and update now if they do
       * innaccurate, but it is the easiest solution to the sticky collision bug
       */
      const distance = this.position.add(this.velocity).subtract(actor.position.add(actor.velocity)).magnitude;

      if (distance <= this.radius + actor.radius) {
        const v1 = collisionVector(this, actor);
        const v2 = collisionVector(actor, this);
        this.velocity = v1;
        actor.velocity = v2;
        this.collisions.push(actor.id + updateId);
        actor.collisions.push(this.id + updateId);
      }
    }

    // setting bounds on the canvas prevents balls from overlapping on update
    const upperLimit = new Vector(state.display.canvas.width - this.radius, state.display.canvas.height - this.radius);
    const lowerLimit = new Vector(0 + this.radius, 0 + this.radius);

    // check if hitting left or right of container
    if (this.position.x >= upperLimit.x || this.position.x <= lowerLimit.x) {
      this.velocity = new Vector(-this.velocity.x, this.velocity.y);
    }

    // check if hitting top or bottom of container
    if (this.position.y >= upperLimit.y || this.position.y <= lowerLimit.y) {
      this.velocity = new Vector(this.velocity.x, -this.velocity.y);
    }

    const newX = Math.max(Math.min(this.position.x + this.velocity.x, upperLimit.x), lowerLimit.x);
    const newY = Math.max(Math.min(this.position.y + this.velocity.y, upperLimit.y), lowerLimit.y);

    return new Ball({
      ...this,
      position: new Vector(newX, newY),
    });
  }

  get area() {
    return Math.PI * this.radius ** 2;
  }

  get sphereArea() {
    return 4 * Math.PI * this.radius ** 2;
  }
}

// see elastic collision: https://en.wikipedia.org/wiki/Elastic_collision
const collisionVector = (particle1, particle2) => {
  return particle1.velocity.subtract(
    particle1.position
      .subtract(particle2.position)
      .multiply(
        particle1.velocity.subtract(particle2.velocity).dotProduct(particle1.position.subtract(particle2.position)) /
          particle1.position.subtract(particle2.position).magnitude ** 2
      )

      // add mass to the system
      .multiply((2 * particle2.sphereArea) / (particle1.sphereArea + particle2.sphereArea))
  );
};

const isMovingTowards = (particle1, particle2) => {
  return particle2.position.subtract(particle1.position).dotProduct(particle1.velocity) > 0;
};

const runAnimation = (animation) => {
  let lastTime = null;
  const frame = (time) => {
    if (lastTime !== null) {
      const timeStep = Math.min(100, time - lastTime) / 1000;

      // return false from animation to stop
      if (animation(timeStep) === false) {
        return;
      }
    }
    lastTime = time;
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
};

const random = (max = 9, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const colors = ['red', 'green', 'blue', 'purple', 'orange'];

const collidingBalls = ({ width = 400, height = 400, parent = document.body, count = 50 } = {}) => {
  const display = new Canvas(parent, width, height);
  const balls = [];
  for (let i = 0; i < count; i++) {
    balls.push(
      new Ball({
        radius: random(8, 3) + Math.random(),
        color: colors[random(colors.length - 1)],
        position: new Vector(random(width - 10, 10), random(height - 10, 10)),
        velocity: new Vector(random(3, -3), random(3, -3)),
      })
    );
  }
  let state = new State(display, balls);
  runAnimation((time) => {
    state = state.update(time);
    display.sync(state);
  });
};

collidingBalls();
