import { circleCollideWithRectangle } from './utils.js';

export class Player {
  static radius = 15;
  static color = 'yellow';
  static speed = 5;

  constructor(ctx, { position }) {
    this.ctx = ctx;
    this.position = position;
    this.velocity = { x: 0, y: 0 };
    this.radius = Player.radius;
    this.color = Player.color;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  update() {
    this.position.x = this.position.x + this.velocity.x;
    this.position.y = this.position.y + this.velocity.y;

    this.draw();
  }

  setVelocityX(x) {
    this.velocity.x = x;
  }

  setVelocityY(y) {
    this.velocity.y = y;
  }

  setVelocities(x, y) {
    this.velocity.x = x;
    this.velocity.y = y;
  }

  getProps() {
    return {
      velocity: this.velocity,
      position: this.position,
      radius: this.radius,
    };
  }
}

export class PlayerController {
  static keyUp = 'ArrowUp';
  static keyDown = 'ArrowDown';
  static keyRight = 'ArrowRight';
  static keyLeft = 'ArrowLeft';

  constructor(player) {
    this.player = player;
    this.keys = {
      up: {
        pressed: false,
      },
      down: {
        pressed: false,
      },
      right: {
        pressed: false,
      },
      left: {
        pressed: false,
      },
    };
    this.lastKey = '';

    this.init();
  }

  init() {
    document.addEventListener('keydown', ({ key }) => {
      switch (key) {
        case PlayerController.keyUp: {
          this.keys.up.pressed = true;
          this.lastKey = PlayerController.keyUp;
          break;
        }
        case PlayerController.keyDown: {
          this.keys.down.pressed = true;
          this.lastKey = PlayerController.keyDown;
          break;
        }
        case PlayerController.keyRight: {
          this.keys.right.pressed = true;
          this.lastKey = PlayerController.keyRight;
          break;
        }
        case PlayerController.keyLeft: {
          this.keys.left.pressed = true;
          this.lastKey = PlayerController.keyLeft;
          break;
        }
      }
    });

    document.addEventListener('keyup', ({ key }) => {
      switch (key) {
        case PlayerController.keyUp: {
          this.keys.up.pressed = false;
          break;
        }
        case PlayerController.keyDown: {
          this.keys.down.pressed = false;
          break;
        }
        case PlayerController.keyRight: {
          this.keys.right.pressed = false;
          break;
        }
        case PlayerController.keyLeft: {
          this.keys.left.pressed = false;
          break;
        }
      }
    });
  }

  moving(boundaries) {
    if (this.keys.up.pressed && this.lastKey === PlayerController.keyUp) {
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];

        const props = { ...this.player.getProps() };
        props.velocity = { x: 0, y: -5 };

        const isPredictCollide = circleCollideWithRectangle(props, boundary);
        if (isPredictCollide) {
          this.player.setVelocityY(0);
          break;
        } else {
          this.player.setVelocityY(-Player.speed);
        }

        this.player.setVelocityX(0);
      }
    } else if (this.keys.down.pressed && this.lastKey === PlayerController.keyDown) {
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];
        const props = { ...this.player.getProps() };
        props.velocity = { ...{ x: 0, y: 5 } };

        const isPredictCollide = circleCollideWithRectangle(props, boundary);

        if (isPredictCollide) {
          this.player.setVelocityY(0);
          break;
        } else {
          this.player.setVelocityY(Player.speed);
        }

        this.player.setVelocityX(0);
      }
    } else if (this.keys.left.pressed && this.lastKey === PlayerController.keyLeft) {
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];
        // todo refactoring
        const props = { ...this.player.getProps() };
        props.velocity = { ...{ x: -5, y: 0 } };
        // this.player.setVelocities(-5, 0);

        const isPredictCollide = circleCollideWithRectangle(this.player, boundary);

        if (isPredictCollide) {
          this.player.setVelocityX(0);
          break;
        } else {
          this.player.setVelocityX(-Player.speed);
        }

        this.player.setVelocityY(0);
      }
    } else if (this.keys.right.pressed && this.lastKey === PlayerController.keyRight) {
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];
        const props = { ...this.player.getProps() };
        props.velocity = { ...{ x: 5, y: 0 } };

        const isPredictCollide = circleCollideWithRectangle(this.player, boundary);

        if (isPredictCollide) {
          this.player.setVelocityX(0);
          break;
        } else {
          this.player.setVelocityX(Player.speed);
        }
      }

      this.player.setVelocityY(0);
    }

    // this.player.velocity.x = 0;
    // this.player.velocity.y = 0;
  }
}
