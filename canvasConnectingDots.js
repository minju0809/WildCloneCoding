import { Dot } from "./dot";
const canvas = document.querySelector(".canvasConnectingDots");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const dots = [];

for (let i = 0; i < 50; i++) {
  const randomX = Math.random() * window.innerWidth;
  const randomY = Math.random() * window.innerHeight;
  const dot = new Dot(canvas, ctx, randomX, randomY);
  dots.push(dot);
}

(function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (dots.length > 0) {
    dots.forEach((dot, index_1) => {
      dot.update();
      dots.forEach((dot_2, index_2) => {
        if (index_1 === index_2) return;
        const distance = 
          (dot.x - dot_2.x) * (dot.x - dot_2.x) + 
          (dot.y - dot_2.y) * (dot.y - dot_2.y);
        const distanceSq = Math.sqrt(distance);
        if (distanceSq < 100) {
          const opacity = 1 - distanceSq / 100;
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(dot_2.x, dot_2.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.stroke();
        }
      });
    });
  }
  requestAnimationFrame(animate);
})();
