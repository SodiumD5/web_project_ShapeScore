//캔버스 크기 조정
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//캔버스 도형 그리기
const ctx = canvas.getContext('2d');

let isDrawing = false;
let lastX = 0;
let lastY = 0;
canvas.addEventListener('mousedown', (e) => {
    CheckTime();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "blue";
    ctx.setLineDash([0,0])
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
}, {once : true});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    draw(e.offsetX, e.offsetY);
});
function draw(x, y) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    lastX = x;
    lastY = y;
}
function animate() {
    requestAnimationFrame(animate);
}
animate();

//캔버스 사이즈 바꾸면 내보내기
window.addEventListener("resize", ()=> {
    alert("비정상적인 행위가 감지되었습니다. \n창 크기를 고정해주세요.")
});

//캔버스에 점선으로 된 원 그리기
function toRadian(d){
    return (d*Math.PI)/180;
}
ctx.lineWidth = 5;
ctx.strokeStyle = "gray";
ctx.beginPath();
ctx.setLineDash([10,20])
ctx.arc(canvas.width/2, canvas.height/2, 200, 0, toRadian(360));
ctx.stroke();

//캔버스에 설명 쓰기
ctx.font = 'bold italic 20pt 나눔고딕';
ctx.textAlign = 'center';
ctx.fillText("3초 안에 마우스를 누른 채로 완벽한 원을 그려주세요!", canvas.width/2, canvas.height*4/5);

//캔버스 상단에 남은 시간 표시
const timerDisplay = document.getElementById('timer');
function CheckTime(){
    var left_time = 3
    let seconds = 0;
    let miliSeconds = 0;
    const interval = setInterval(() => {
        left_time = Math.floor((left_time-0.01)*100)/100
        seconds = Math.floor(left_time);
        miliSeconds = Math.floor((left_time-seconds)*100);
        //console.log(left_time, seconds, miliSeconds)
        const formattedTime = 
            `${String(seconds).padStart(2, '0')}:${String(miliSeconds).padStart(2, '0')}`;
        timerDisplay.textContent = formattedTime;  
        
        if (seconds == 0 && miliSeconds == 0){
            clearInterval(interval);
        }
    }, 10);
}





