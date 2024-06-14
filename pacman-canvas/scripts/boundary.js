import { circleCollideWithRectangle } from './utils.js';
import { IMAGE_PATHS_MAP } from './constants.js';

export class Boundary {
  constructor(ctx, { position, image, width, height }) {
    this.ctx = ctx;
    this.position = position;
    this.image = image;
  }

  draw() {
    this.ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}

export class BoundaryBuilder {
  constructor(ctx, { map, gameOptions }) {
    this.ctx = ctx;
    this.map = map;
    this.gameOptions = gameOptions;
    this.boundaries = [];

    this.create();
  }

  create() {
    const createImage = (src) => {
      const image = new Image();
      image.src = src;
      return image;
    };

    const createBoundary = (cellIndex, rowIndex, cell) => {
      this.boundaries.push(
        new Boundary(this.ctx, {
          position: {
            x: cellIndex * this.gameOptions.cellWidth,
            y: rowIndex * this.gameOptions.cellHeight,
          },
          image: createImage(IMAGE_PATHS_MAP[cell]),
        })
      );
    };

    this.map.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        switch (cell) {
          case '-': {
            createBoundary(cellIndex, rowIndex, cell);
            break;
          }
          case '|': {
            createBoundary(cellIndex, rowIndex, cell);
            break;
          }
          case '1': {
            createBoundary(cellIndex, rowIndex, cell);
            break;
          }
          case '2': {
            createBoundary(cellIndex, rowIndex, cell);
            break;
          }
          case '3': {
            createBoundary(cellIndex, rowIndex, cell);
            break;
          }
          case '4': {
            createBoundary(cellIndex, rowIndex, cell);
            break;
          }
          case 'b': {
            createBoundary(cellIndex, rowIndex, cell);
            break;
          }
          case '[':
            createBoundary(cellIndex, rowIndex, cell);
            break;
          case ']':
            createBoundary(cellIndex, rowIndex, cell);
            break;
          case '_':
            createBoundary(cellIndex, rowIndex, cell);
            break;
          case '^':
            createBoundary(cellIndex, rowIndex, cell);
            break;
          case '+':
            createBoundary(cellIndex, rowIndex, cell);
            break;
          case '5':
            createBoundary(cellIndex, rowIndex, cell);
            break;
          case '6':
            createBoundary(cellIndex, rowIndex, cell);
            break;
          case '7':
            createBoundary(cellIndex, rowIndex, cell);
            break;
          case '8':
            createBoundary(cellIndex, rowIndex, cell);
            break;
        }
      });
    });
  }

  draw() {
    this.boundaries.forEach((boundary) => {
      boundary.draw();
    });
  }

  checkCollision(player) {
    let result = false;

    for (let i = 0; i < this.boundaries.length; i++) {
      const boundary = this.boundaries[i];
      boundary.width = this.gameOptions.cellWidth;
      boundary.height = this.gameOptions.cellHeight;

      if (circleCollideWithRectangle(player, boundary)) {
        result = true;
        break;
      }
    }

    return result;
  }
}
