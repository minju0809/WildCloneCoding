const canvasThreeJsBtn = document.querySelector(".canvasThreeJsBtn");
const canvasThreeJs = document.querySelector(".canvasThreeJs");
const boardResetBtn = document.querySelector(".boardResetBtn");
const eraserBtn = document.querySelector(".eraserBtn");
const penBtn = document.querySelector(".penBtn");
const dotsBtn = document.querySelector(".dotsBtn");

canvasThreeJsBtn.addEventListener("click", function () {
  canvasThreeJs.classList.toggle("active");
  canvasBrush.classList.remove("active");
  boardResetBtn.classList.remove("active");
  eraserBtn.classList.remove("active");
  penBtn.classList.remove("active");
  dotsBtn.classList.remove("active");
});

const canvasBrushBtn = document.querySelector(".canvasBrushBtn");
const canvasBrush = document.querySelector(".canvasBrush");

canvasBrushBtn.addEventListener("click", function () {
  canvasBrush.classList.toggle("active");
  canvasThreeJs.classList.remove("active");
  boardResetBtn.classList.toggle("active");
  eraserBtn.classList.toggle("active");
  penBtn.classList.toggle("active");
  dotsBtn.classList.toggle("active");
});
