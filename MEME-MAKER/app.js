const modeBtn = document.getElementById("mode-btn");
const resetBtn = document.getElementById("reset-btn");
const eraseBtn = document.getElementById("eraser-btn");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
//context는 canvas에서는 기본적으로 붓의 역할을 한다
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value; //초기값 4로 설정(HTML)
let isPainting = false;
let isFilling = false;

//마우스를 따라 선 움직이기
function onMove(event){
  if(isPainting){
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting(){
  isPainting = true;
}
function cancelPainting(){
  isPainting = false;
}
//선의 굵기 조정
function onLineWidthChange(event){
  ctx.lineWidth = event.target.value;
}
//색 바꾸기
function onColorChange(event){
  const colorValue = event.target.value;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
}
//색을 지정해서 색 바꾸기
function onColorClick(event){
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  //색이 바뀔때마다 input안의 색깔도 변경
  color.value = colorValue;
}

//모드 변경 해줄때 마다 글씨 바꾸기
function onModeClick(){
  if(isFilling){
    isFilling = false
    modeBtn.innerText = "Fill"
  } else {
    isFilling = true
    modeBtn.innerText = "Draw"
  }
}
//fill 모드일때 얼만큼 채울지 정해주기
function onCanvasClick(){
  if(isFilling){
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
//그림판을 흰색으로 채워서 RESET시키기
function onResetClick(){
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
//지우기 버튼
function onEraseClick(){
  ctx.strokeStyle = "white";
  isFilling = false
  modeBtn.innerText = "Fill"
}
//click은 마우스를 눌렀다 뗐을때를 의미
//mousedown은 마우스를 누른 채로 있을때를 의미
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
//canvas에서는 항상 경로를 새로 지정하는 것이 중요하다!!
color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);
resetBtn.addEventListener("click", onResetClick);
eraseBtn.addEventListener("click", onEraseClick);