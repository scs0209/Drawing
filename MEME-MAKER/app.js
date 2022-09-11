const canvas = document.querySelector("canvas");
//context는 canvas에서는 기본적으로 붓의 역할을 한다
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.fillRect(210 - 40, 200 - 50, 15, 100);
ctx.fillRect(350 - 40, 200 - 50, 15, 100);
ctx.fillRect(260 - 40, 200 - 50, 60, 200);

//원 만들기(사람 머리)
ctx.arc(250, 100, 50, 0, 2 * Math.PI);
ctx.fill();

//눈 만들기
ctx.beginPath();
ctx.fillStyle = "white";
ctx.arc(260 + 10, 80, 8, Math.PI, 2 * Math.PI);
ctx.arc(220 + 10, 80, 8, Math.PI, 2 * Math.PI);
ctx.fill();