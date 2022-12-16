const basicCanvasBtn = document.querySelector(".basicCanvasBtn");
const basicCanvas = document.querySelector(".basicCanvas");
const boardResetBtn = document.querySelector(".boardResetBtn");
const eraserBtn = document.querySelector(".eraserBtn");
const penBtn = document.querySelector(".penBtn");
const dotsBtn = document.querySelector(".dotsBtn");

basicCanvasBtn.addEventListener("click", function () {
  basicCanvas.classList.toggle("active");
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
  basicCanvas.classList.remove("active");
  boardResetBtn.classList.toggle("active");
  eraserBtn.classList.toggle("active");
  penBtn.classList.toggle("active");
  dotsBtn.classList.toggle("active");
});
