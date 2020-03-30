const canvas = document.getElementById("jsCanvas"),
ctx = canvas.getContext("2d"),
colors = document.querySelectorAll(".jsColor"),
range = document.querySelector("#jsRange"),
mode = document.querySelector("#jsMode"),
INITIAL_COLOR = "#2c2c2c",
CANVAS_SIZE = 700,
saveBtn = document.querySelector("#jsSave");


canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle = "white"

let painting = false;
let filling = false;

//색 변경
function handleColorClick(e) {
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))

//캔버스 작동
function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(e) {
    const x = e.offsetX;
    const y = e.offsetY;

    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown() {
    painting = ture;
}

function handleCM(e) {
    e.preventDefault();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
}

//브러시 두께
function handleRangeChange(e) {
    const size = e.target.value;
    ctx.lineWidth = size
}

if(range) {
    range.addEventListener("input", handleRangeChange);
}

//색 채우기
function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    }else {
        filling = true;
        mode.innerText = "Paint";
    }
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

function handleSaveClick() {
    const image = canvas.toDataURL()
    const link = document.createElement("a");
    link.href = image;
    link.download = "Painting";
    link.click();
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick)
}