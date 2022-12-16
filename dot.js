class Dot {
  constructor(canvas, ctx, x, y) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = x;
    this.y = y;

    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;

    this.radius = 3;
  }

  update() {
    const ctx = this.ctx;
    if (this.x < this.radius || this.x > this.canvas.width - this.radius) this.speedX *= -1;
    if (this.y < this.radius || this.y > this.canvas.height - this.radius) this.speedY *= -1;
    this.x += this.speedX;
    this.y += this.speedY;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
  }
}

export { Dot };
