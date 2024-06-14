export const circleCollideWithRectangle = (circle, rectangle) => {
  // return false;

  return (
    // top
    circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height &&
    // right
    circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x &&
    // bottom
    circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y &&
    // left
    circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.height
  );
};

export const circleCollideWithCircle = (circle1, circle2) => {
  return (
    Math.hypot(circle1.position.x - circle2.position.x, circle1.position.y - circle2.position.y) <
    circle1.radius + circle2.radius
  );
};
