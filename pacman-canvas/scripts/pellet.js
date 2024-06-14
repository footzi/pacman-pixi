import { circleCollideWithCircle } from './utils.js';

export class Pellet {
  static radius = 3;
  static color = 'white';

  constructor(ctx, { position }) {
    this.ctx = ctx;
    this.position = position;
    this.radius = Pellet.radius;
    this.color = Pellet.color;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }
}

export class PelletBuilder {
  constructor(ctx, { map, gameOptions }) {
    this.ctx = ctx;
    this.pellets = [];
    this.map = map;
    this.gameOptions = gameOptions;

    this.create();
  }

  create() {
    this.map.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell === '.') {
          const x = cellIndex * this.gameOptions.cellWidth + this.gameOptions.cellWidth / 2;
          const y = rowIndex * this.gameOptions.cellHeight + this.gameOptions.cellHeight / 2;

          this.pellets.push(
            new Pellet(this.ctx, {
              position: {
                x,
                y,
              },
            })
          );
        }
      });
    });
  }

  draw() {
    this.pellets.forEach((pellet) => {
      // pellet.draw();
    });
  }

  checkCollusion(player) {
    for (let i = this.pellets.length - 1; 0 < i; i--) {
      const pellet = this.pellets[i];
      pellet.draw();
      // console.log(this.pellets);

      if (circleCollideWithCircle(pellet, player)) {
        console.log('collide');
        this.pellets.splice(i, 1);
      }
    }
  }
}
