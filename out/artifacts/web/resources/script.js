
function drawCanvas(R){
    let canvas, ctx;
    try {
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext('2d');
    } catch (e) {
        alert("Ваш браузер не поддерживает элемент HTML5 Canvas.");
        document.getElementById("support").innerHTML =
            "<br><br>" +
            "<img src='area.jpg' alt='Область' width='420' height='380'>";
        return;
    }
    canvas.height = 300;
    canvas.width = 300;
    ctx.fillStyle = '#3355ff';
    ctx.beginPath();
    ctx.moveTo(150, 90);
    ctx.lineTo(210, 150);
    ctx.lineTo(150, 150);
    ctx.fill();
    ctx.arc(150, 150, 120, 0.5 * Math.PI, Math.PI, false);
    ctx.lineTo(270, 150);
    ctx.lineTo(270, 270);
    ctx.lineTo(150, 270);
    ctx.fill();
    ctx.strokeStyle = '#000000'; // меняем цвет рамки
    ctx.strokeRect(150, 0, 0, 300);
    ctx.strokeRect(0, 150, 300, 0);
    ctx.moveTo(150, 0);
    ctx.lineTo(146, 10);
    ctx.moveTo(150, 0);
    ctx.lineTo(154, 10);
    ctx.moveTo(300, 150);
    ctx.lineTo(290, 146);
    ctx.moveTo(300, 150);
    ctx.lineTo(290, 154);
    ctx.moveTo(30, 145);
    ctx.lineTo(30, 155);
    ctx.moveTo(90, 145);
    ctx.lineTo(90, 155);
    ctx.moveTo(210, 145);
    ctx.lineTo(210, 155);
    ctx.moveTo(270, 145);
    ctx.lineTo(270, 155);
    ctx.moveTo(145, 30);
    ctx.lineTo(155, 30);
    ctx.moveTo(145, 90);
    ctx.lineTo(155, 90);
    ctx.moveTo(145, 210);
    ctx.lineTo(155, 210);
    ctx.moveTo(145, 270);
    ctx.lineTo(155, 270);
    ctx.stroke();
    ctx.strokeText("-" + R / 2, 90, 140, 20);
    ctx.strokeText("-" + R, 30, 140, 20);
    ctx.strokeText(`${R / 2}`, 210, 140, 20);
    ctx.strokeText(R, 270, 140, 20);
    ctx.strokeText(R, 160, 33, 20);
    ctx.strokeText(R / 2, 160, 93, 20);
    ctx.strokeText("-" + R / 2, 160, 213, 20);
    ctx.strokeText("-" + R, 160, 273, 20);
    ctx.strokeText("x", 290, 140, 20);
    ctx.strokeText("y", 160, 10, 20);
    ctx.closePath();
}