const basicCanvasBtn = document.querySelector(".basicCanvasBtn");
const basicCanvas = document.querySelector(".basicCanvas");

basicCanvasBtn.addEventListener("click", function () {
  basicCanvas.classList.toggle("active");
});
