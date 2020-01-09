function check() {
    return false;

    warningX.hidden = true;
    let yField = document.getElementById("y");
    yField.classList.remove("warning-field");
    warningYValue.hidden = true;
    warningYFormat.hidden = true;
    warningR.hidden = true;

    checkX();
    checkY();
    checkR();
    if (rValid && yValid && xValid) {
        drawPoint(document.getElementById("canvas").getContext('2d'),
            document.getElementById("x").value,
            document.getElementById("y"),
            document.getElementById("r"))
    }
    return (rValid && yValid && xValid);
}

function checkX() {
    let x = document.getElementById("x").value;

    if (x === 'no') {
        xValid = false;
        warningX.hidden = false;
    } else {
        xValid = true;
        warningX.hidden = true;
    }
}

function checkY() {
    let yField = document.getElementById("y");
    // /[^0-9,.+-]/.test(yField.value)
    if (yField.value === '') {
        yField.classList.add("warning-field");
        warningYFormat.hidden = false;
        warningYValue.hidden = false;
        yValid = false;
    } else if (!/^[-+]?([0-5]([.,]\d+)?)/.test(yField.value)) {
        yField.classList.add("warning-field");
        warningYValue.hidden = false;
        yValid = false;
    } else {
        console.log(parseFloat(yField.value));
        let y = yField.value;
        if (y < -5 || y > 5) {
            yField.classList.add("warning-field");
            warningYValue.hidden = false;
            yValid = false;
        } else {
            yField.classList.remove("warning-field");
            warningYFormat.hidden = true;
            warningYValue.hidden = true;
            yValid = true;
        }
    }
}

function checkR() {
    let r = document.getElementById("r").value;

    if (r === 'no') {
        rValid = false;
        warningR.hidden = false;
    } else {
        rValid = true;
        warningR.hidden = true;
    }
}

function clickOnArea() {
    checkR();
    if (!rValid) {
        return;
    }
    let canvas = document.getElementById("canvas");
    let boundRect = canvas.getBoundingClientRect();
    let left = boundRect.left;
    let top = boundRect.top;

    let event = window.event;
    let xClick = event.clientX - left;
    let yClick = event.clientY - top;
    let r = document.getElementById("r").value;
    let x = (xClick - 150) / 120 * r;
    let y = (150 - yClick) / 120 * r;
    drawPoint(canvas.getContext('2d'), x, y, r);
    request(x, y, r);
}

function drawPoint(context, x, y, r) {
    if (isInArea(x, y, r)) {
        context.fillStyle = "red";
    } else {
        context.fillStyle = "green";
    }
    context.beginPath();
    context.strokeStyle = "black";
    context.arc(x / r * 120 + 150, 150 - y / r * 120, 3, 0 * Math.PI, 2 * Math.PI);
    context.closePath();
    context.fill();
}

function isInArea(x, y, r) {
    if ((x >= (-r / 2)) && (y >= (-x - r / 2)) && (x <= 0) && (y <= 0)) {
        return true;
    }
    if ((x >= 0) && (x <= r / 2) && (y >= -Math.sqrt(Math.pow((r / 2), 2) - Math.pow(x, 2)))
        && (y <= r)) {
        return true;
    }
    return false;
}

function request(x, y, r) {
    $.ajax({
        type: 'get',
        url: 'control',
        data: {'x': x, 'y': y, 'r': r},
        response: 'text',
        error: function (message) {
            alert("Error: " + message);
        },
        success: function (data) {   //возвращаемый результат от сервера
            let iframe = document.getElementById('response');
            iframe = iframe.contentWindow || iframe.document || iframe.contentDocument;
            iframe.document.open();
            iframe.document.write(data);
            iframe.document.close();
        }
    });
}

function drawCanvas(R) {
    let canvas, ctx;
    try {
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext('2d');
    } catch (e) {
        alert("Ваш браузер не поддерживает элемент HTML5 Canvas.");
        document.getElementById("support").innerHTML =
            "<br><br><img src='area.jpg' alt='Область' width='420' height='380'>";
        return;
    }
    canvas.height = 300;
    canvas.width = 300;
    ctx.fillStyle = '#3355ff';
    ctx.beginPath();

    //Triangle
    ctx.moveTo(150, 90);
    ctx.lineTo(90, 150);
    ctx.lineTo(150, 150);
    ctx.fill();

    //Quadrant
    ctx.arc(150, 150, 120, 0, 0.5 * Math.PI, false);

    //Rectangle
    ctx.lineTo(90, 270);
    ctx.lineTo(90, 150);
    // ctx.lineTo(150, 270);
    ctx.fill();

    //Lines
    ctx.strokeStyle = '#000000'; // colour of the lines
    ctx.strokeRect(150, 0, 0, 300); // y axis
    ctx.strokeRect(0, 150, 300, 0); // x axis

    //Strokes
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

    //Signatures on the chart
    if (R === undefined) {
        ctx.strokeText("-R/2", 90, 140, 20);
        ctx.strokeText("-R", 30, 140, 20);
        ctx.strokeText("R/2", 210, 140, 20);
        ctx.strokeText("R", 270, 140, 20);
        ctx.strokeText("R", 160, 33, 20);
        ctx.strokeText("R/2", 160, 93, 20);
        ctx.strokeText("-R/2", 160, 213, 20);
        ctx.strokeText("-R", 160, 273, 20);
    } else {
        ctx.strokeText(`-${R / 2}`, 90, 140, 20);
        ctx.strokeText(`-${R}`, 30, 140, 20);
        ctx.strokeText(`${R / 2}`, 210, 140, 20);
        ctx.strokeText(R, 270, 140, 20);
        ctx.strokeText(R, 160, 33, 20);
        ctx.strokeText(`${R / 2}`, 160, 93, 20);
        ctx.strokeText(`-${R / 2}`, 160, 213, 20);
        ctx.strokeText(`-${R}`, 160, 273, 20);
        ctx.strokeText("x", 290, 140, 20);
        ctx.strokeText("y", 160, 10, 20);
    }
    ctx.closePath();
}