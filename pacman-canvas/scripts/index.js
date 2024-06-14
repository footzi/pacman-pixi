import { BoundaryBuilder } from './boundary.js';
import { MAP } from './constants.js';
import { Player, PlayerController } from './player.js';
import { PelletBuilder } from './pellet.js';

class Game {
  constructor(gameOptions) {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.gameOptions = gameOptions;
    this.boundaryBuilder = new BoundaryBuilder(this.ctx, { map: MAP, gameOptions });
    this.pelletBuilder = new PelletBuilder(this.ctx, { map: MAP, gameOptions });
    this.player = new Player(this.ctx, {
      position: { x: 60, y: 60 },
    });
    this.playerController = new PlayerController(this.player);

    this.init();
  }

  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.player.draw();

    this.animate();
  }

  animate() {
    this.clear();

    this.playerController.moving(this.boundaryBuilder.boundaries);

    this.boundaryBuilder.draw();
    // this.pelletBuilder.draw();
    this.pelletBuilder.checkCollusion(this.player);

    const isCollide = this.boundaryBuilder.checkCollision(this.player);

    if (isCollide) {
      this.player.setVelocities(0, 0);
    }

    this.player.update();

    window.requestAnimationFrame(this.animate.bind(this));
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

new Game({
  cellWidth: 40,
  cellHeight: 40,
  playerSpeed: 0,
});
