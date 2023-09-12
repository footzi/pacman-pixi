import { Application, Container, Graphics } from 'pixi.js';
import { EntityParams, Position } from '../types.ts';

export class Player {
  app: Application;
  container: Container;
  params: EntityParams;
  step: number = 5;

  constructor(app: Application) {
    this.app = app;
    this.container = new Container();
    this.container.name = 'Player';
    this.params = { x: 15, y: 0, width: 30, height: 30 };
    this.previousParams = { x: 15, y: 0, width: 30, height: 30 };
  }

  render() {
    const obj = new Graphics();
    obj.beginFill('#f1f1f1');
    obj.drawRect(0, 0, this.params.width, this.params.height);

    this.container.position.x = this.params.x;
    this.container.position.y = this.params.y;
    this.container.addChild(obj);
    this.app.stage.addChild(this.container);
  }

  up() {
    this.params.y = this.params.y - this.step;
    this.container.position.y = this.params.y;
  }

  down() {
    this.params.y = this.params.y + this.step;
    this.container.position.y = this.params.y;
  }

  right() {
    this.previousParams = { ...this.params };

    const { x } = this.getNextRight();

    this.params.x = x;
    this.container.position.x = x;
  }

  rightOn(value: number) {
    const x = value + this.params.x;

    this.params.x = x;
    this.container.position.x = x;
  }

  left() {
    this.params.x = this.params.x - this.step;
    this.container.position.x = this.params.x;
  }

  leftOn(value: number) {
    const x = this.params.x - value;

    this.params.x = x;
    this.container.position.x = x;
  }

  getNextRight(): EntityParams {
    return {
      ...this.params,
      x: this.params.x + this.step,
    };
  }

  getParams() {
    return this.params;
  }
  //
  getPreviousParams() {
    return this.previousParams;
  }
}
