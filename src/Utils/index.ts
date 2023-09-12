import { EntityParams, Position } from '../types.ts';

export class Utils {
  static isCollision(entity: EntityParams, area: EntityParams): boolean {
    return (
      entity.x <= area.x + area.width &&
      entity.x + entity.width >= area.x &&
      entity.y <= area.y + area.height &&
      entity.y + entity.height >= area.y
    );
  }

  static getCollusionCoordsSafety(entity: EntityParams, area: EntityParams): Position {
    console.log(entity, 'entity', entity.x + entity.width);
    console.log(area, 'area', area.x);

    return {
      x: entity.x + entity.width - area.x,
      y: 0,
    };
  }
}
