const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput =  document.getElementById("file");
const modeBtn = document.getElementById("mode-btn");
const resetBtn = document.getElementById("reset-btn");
const eraseBtn = document.getElementById("eraser-btn");
//forEach함수를 쓰기 위해서는 배열형태로 바꿔줘야되기 때문에 Array사용
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
ctx.lineWidth = lineWidth.value; //초기값 5로 설정(HTML), 브라우저가 실행될때 딱 한번만 실행됨
ctx.lineCap = "round";
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

//이미지 가져오기
function onFileChange(event){
  const file = event.target.files[0];
  //우리는 url을 통해서 해당 파일에 접근하려는거기 때문에 createObjectURL을 사용 => 유저가 파일을 업로드한 브라우저 안에서만 사용할 수 있는 url
  const url = URL.createObjectURL(file);
  const image = new Image() //html에서 <img src="">와 같은 의미
  //위의 코드는 document.createElement("image")와 같은 코드
  image.src = url;
  //url로 이미지를 가져와서 화면에 그림
  image.onload = function(){
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  }
}

//더블클릭하여 텍스트를 canvas안에 집어 넣어주기
function onDoubleClick(event){
  const text = textInput.value;
  if(text !== ""){
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "68px serif";
    ctx.fillText(text,event.offsetX, event.offsetY);
    //offsetX, offsetY는 마우스가 클릭한 canvas 내부좌표
    ctx.restore();
  }
}
//ctx.save ~ ctx.restore사이에 있는 코드는 저장이 되지 않고 실행된 후에 기존에 있던 코드들이 다시 진행된다.
//즉 ctx.save를 한 지점으로 다시 돌아간다는 얘기이다.


//이미지 저장
function onSaveClick(){
  //캔버스에 있는 그림 데이터를 url로 변환해주는 메소드
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url
  a.download = "myDrawing.png"
  console.log(a);
  a.click();
}


//click은 마우스를 눌렀다 뗐을때를 의미
//mousedown은 마우스를 누른 채로 있을때를 의미
canvas.addEventListener("dblclick", onDoubleClick);
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
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);