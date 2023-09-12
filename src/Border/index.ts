import { EntityParams } from '../types.ts';
import { Application, Container, Graphics } from 'pixi.js';
import { CONSTANTS } from '../constants.ts';

export class Border {
  app: Application;
  params: EntityParams;
  container: Container;

  constructor(params: EntityParams, app: Application) {
    this.params = params;
    this.app = app;
    this.container = new Container();
    this.container.name = 'Border';
  }

  render() {
    const obj = new Graphics();
    obj.beginFill(CONSTANTS.borderColor);
    obj.drawRect(0, 0, this.params.width, this.params.height);

    this.container.position.x = this.params.x;
    this.container.position.y = this.params.y;
    this.container.addChild(obj);
    this.app.stage.addChild(this.container);
  }

  getParams() {
    return this.params;
  }
}
