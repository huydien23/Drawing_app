var color = document.querySelector('#color');
var eraser = document.querySelector('#eraser');
var decrease = document.querySelector('#decrease');
var size = document.querySelector('#size');
var increase = document.querySelector('#increase');
var save = document.querySelector('#save');
var clear = document.querySelector('#clear');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

//Init
var pos1 = {
    x: 0,
    y: 0
}

var pos2 = {
    x: 0,
    y: 0
}

var isDrawing = false;
var colorPaint = '#000';
var sizePaint = 10;

document.addEventListener('mousedown', function(e) {
    pos1 = {
        x: e.offsetX,
        y: e.offsetY
    }
    isDrawing = true;
});

document.addEventListener('mousemove', function(e) {
   if(isDrawing){
    pos2 = {
        x: e.offsetX,
        y: e.offsetY
    }

    //fill nét vẽ
    ctx.beginPath();
    ctx.arc(pos1.x, pos1.y, sizePaint, 0, 2 * Math.PI);
    ctx.fillStyle = colorPaint;
    ctx.fill();

    //vẽ outline
    ctx.beginPath();
    ctx.moveTo(pos1.x, pos1.y);
    ctx.lineTo(pos2.x, pos2.y);
    ctx.strokeStyle = colorPaint;
    ctx.lineWidth = sizePaint * 2;
    ctx.stroke();

    pos1.x = pos2.x;
    pos1.y = pos2.y;
   }
});

document.addEventListener('mouseup', function(e) {
    isDrawing = false;
});

color.addEventListener('change', function(e) {
    colorPaint = e.target.value;
});

eraser.addEventListener('click', function() {
    colorPaint = '#ffffff';
});

decrease.addEventListener('click', function() {
    sizePaint -= 5;
    sizePaint = sizePaint > 5 ? sizePaint : 5;
    size.innerText = sizePaint;
});

increase.addEventListener('click', function() {
    sizePaint += 5;
    sizePaint = sizePaint < 50 ? sizePaint : 50;
    size.innerText = sizePaint;
});

clear.addEventListener('click', function() {
    var canvasStats = canvas.getClientRects();
    ctx.clearRect(0, 0, canvasStats[0].width, canvasStats[0].height);
});

save.addEventListener('click', function() {
    var output = canvas.toDataURL('image/png');
    save.setAttribute('href', output);
});