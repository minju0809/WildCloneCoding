const canvas = document.querySelector(".canvasBrush");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const boardResetBtn = document.querySelector(".boardResetBtn");
const penBtn = document.querySelector(".penBtn");
const dotsBtn = document.querySelector(".dotsBtn");

let drawable = false;
let brushType = "";

boardResetBtn.onclick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};
eraserBtn.onclick = () => {
  if (!eraserBtn.classList.contains("on")) eraserBtn.classList.add("on");
  if (dotsBtn.classList.contains("on")) dotsBtn.classList.remove("on");
  if (penBtn.classList.contains("on")) penBtn.classList.remove("on");
  brushType = "eraser";
};
penBtn.onclick = () => {
  if (!penBtn.classList.contains("on")) penBtn.classList.add("on");
  if (dotsBtn.classList.contains("on")) dotsBtn.classList.remove("on");
  if (eraserBtn.classList.contains("on")) eraserBtn.classList.remove("on");
  brushType = "pen";
};
dotsBtn.onclick = () => {
  if (!dotsBtn.classList.contains("on")) dotsBtn.classList.add("on");
  if (penBtn.classList.contains("on")) penBtn.classList.remove("on");
  if (eraserBtn.classList.contains("on")) penBtn.classList.remove("on");
  brushType = "dots";
};

const fnTable = {
  eraser: (x, y) => new Eraser(x, y),
  pen: (x, y) => new Pen(x, y),
  dots: (x, y) => new Dots(x, y),
};

canvas.addEventListener("mousedown", () => (drawable = true));
canvas.addEventListener("mouseup", () => (drawable = false));
canvas.addEventListener("mousemove", (ev) => {
  if (!drawable || brushType === "") return;

  fnTable[brushType](ev.x, ev.y);
  // new DotsBtn(ev.x, ev.y);
});

class Eraser {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.draw();
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = "rgb(234, 237, 230)";
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    ctx.fill();
  }
}
class Pen {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.draw();
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = "#33691e";
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    ctx.fill();
  }
}
class Dots {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.speedX = 0;
    this.speedY = 0;
    this.radius = Math.random() * 4 + 2;
    this.draw();
  }
  draw() {
    this.speedX += (Math.random() * 4 - 2) / 2;
    this.speedY += (Math.random() * 4 - 2) / 2;
    this.x += this.speedX;
    this.y += this.speedY;
    this.radius -= 0.2;

    if (this.radius > 3) {
      requestAnimationFrame(this.draw.bind(this));
      ctx.beginPath();
      ctx.fillStyle = "#003d00";
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#abdf2f";
      ctx.stroke();
    }
  }
}
