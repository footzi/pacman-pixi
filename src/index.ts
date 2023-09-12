import { Application, Assets, Sprite } from 'pixi.js';
import { Player } from './Player';
import { Border } from './Border';
import { CONSTANTS } from './constants.ts';
import { Utils } from './Utils';

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

    for (let i = 0; i < this.borders.length; i++) {
      const border = this.borders[i];
      const borderParams = border.getParams();

      if (this.isRight) {
        const prevParams = this.player.getPreviousParams();
        const playerParams = this.player.getParams();
        const nextParams = this.player.getNextRight();

        if (Utils.isCollision(nextParams, borderParams)) {
          const { x } = Utils.getCollusionCoordsSafety(nextParams, borderParams);

          const x = nextParams.x - playerParams.x;
          this.player.rightOn(x);
          this.isRight = false;
          this.isRight = false;
        } else {
          this.player.right();
          this.isRight = false;
        }
      }
    }
    console.log('update');
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
