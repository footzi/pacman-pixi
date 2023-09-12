import { Application, Assets, Sprite } from 'pixi.js';
import { Player } from './Player';
import { Border } from './Border';
import { CONSTANTS } from './constants.ts';
import { Utils } from './Utils';

// const app = new Application({ width: 640, height: 360 });
// // @ts-ignore
// document.body.appendChild(app.view);
//
// const sprite = Sprite.from('./assets/sample.png');
// app.stage.addChild(sprite);
//
// // Add a variable to count up the seconds our demo has been running
// let elapsed = 0.0;
// // Tell our application's ticker to run a new callback every frame, passing
// // in the amount of time that has passed since the last tick
// app.ticker.add((delta) => {
//   // console.log(delta);
//   // Add the time to our total elapsed time
//   elapsed += delta;
//   // Update the sprite's X position based on the cosine of our elapsed time.  We divide
//   // by 50 to slow the animation down a bit...
//   sprite.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0;
// });

class Game {
  app: Application;
  player: Player;
  borders: Border[];

  constructor() {
    this.app = new Application({ width: CONSTANTS.width, height: CONSTANTS.height });
    this.borders = [];

    this.isLeft = false;
    this.isRight = false;

    this.app.ticker.add(this.update, this);
    // @ts-ignore
    globalThis.__PIXI_APP__ = this.app;
  }

  init() {
    document.body.appendChild(this.app.view);

    this.initBorders();
    this.initPlayer();
  }

  update() {
    const playerNextParams = this.player.getNextRight();

    // for (let i = 0; i < this.borders.length; i++) {
    //   const border = this.borders[i];
    //   const borderParams = border.getParams();
    //
    //   // console.log(this.isRight);
    //
    //   if (this.isRight) {
    //     // this.isRight = false;
    //     const prevParams = this.player.getPreviousParams();
    //     const playerParams = this.player.getParams();
    //     const nextParams = this.player.getNextRight();
    //
    //     // console.log(prevParams);
    //     console.log(playerParams);
    //     console.log(borderParams, 'border params');
    //
    //     if (Utils.isCollision(nextParams, borderParams)) {
    //       // const { x } = Utils.getCollusionCoordsSafety(nextParams, borderParams);
    //       // console.log('colisiion');
    //       // const x = nextParams.x - playerParams.x;
    //       // this.player.rightOn(x);
    //       // this.isRight = false;
    //       // this.isRight = false;
    //     } else {
    //       this.player.right();
    //       this.isRight = false;
    //     }
    //   }
    // }
    // console.log('update');
  }

  initBorders() {
    CONSTANTS.borders.forEach((border) => {
      const { x, y, width, height } = border;
      const newBorder = new Border({ x, y, width, height }, this.app);
      newBorder.render();

      this.borders.push(newBorder);
    });
  }

  initPlayer() {
    this.player = new Player(this.app);
    this.player.render();

    let isCollision = false;

    // document.addEventListener('keydown', (event) => {
    //   const { key } = event;
    //
    //   if (key === 'ArrowRight') {
    //     console.log('keydown');
    //     this.isRight = true;
    //   }
    // });

    document.addEventListener('keyup', (event) => {
      const { key } = event;
      let direction = '';
      let collapse = false;

      if (key === 'ArrowRight') {
        direction = 'right';

        const nextParams = this.player.getNextRight();
        const playerParams = this.player.getParams();

        const isNextCollpasing = this.borders.some((border) => {
          const borderParams = border.getParams();

          return Utils.isCollision(nextParams, borderParams);
        });

        if (isNextCollpasing && !collapse) {
          // const
          this.player.right();
          let collapse = true;
        } else {
          this.player.right();
          let collapse = false;
        }
      }

      if (key === 'ArrowLeft') {
        direction = 'left';

        const playerParams = this.player.getParams();

        const isCol = this.borders.some((border) => {
          const borderParams = border.getParams();

          return Utils.isCollision(playerParams, borderParams);
        });

        if (!isCol && direction === 'left') {
          this.player.left();
        }
      }
    });
  }
}

new Game().init();
