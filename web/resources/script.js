// Обработка данных с формы или из URL
function getDataAndDrawPoint() {
    let x;
    let xArray = [];
    let y;
    let r;
    let dataFromURL = getUrlVars();
    if (dataFromURL > 0) {
        [x, y, r] = dataFromURL;

        if (!checkY(y)) {
            return false;
        }

        drawPoint(document.getElementById("canvas").getContext('2d'), 120 * x / r + 150, 150 - 120 * y, r);
        request(x, y, r);
        return true;
    } else {
        xArray = getXFromForm();
        y = getYFromForm();
        r = getRFromForm();

        if (!checkY(y)) {
            return false;
        }

        if (!checkX()) {
            return false;
        }

        for (let x of xArray) {
            drawPoint(document.getElementById("canvas").getContext('2d'), 120 * x / r + 150, 150 - 120 * y, r);
            saveSession(x, y, r);
        }
        return true;
    }
}

function getYFromForm() {
    let elY = document.getElementById('y');
    elY.setCustomValidity("");
    let y = elY.value.replace(",", ".");
    return y;
}

function getXFromForm() {
    let xArray = document.getElementsByClassName("x");
    let xArrayChecked = [];
    let i = -5;
    for (let elX of xArray) {
        i++;
        if (elX.checked) {
            xArrayChecked.push(i);
        }
    }

    return xArrayChecked;
}

function getRFromForm() {
    let rArray = document.getElementsByClassName("r");
    let r;
    for (let i = 0; i < rArray.length; i++) {
        let elR = rArray[i];
        if (elR.checked) {
            r = i + 1;
            break;
        }
    }
    return r;
}

function getRadiusElementByValue(rValue) {
    let rArray = document.getElementsByClassName("r");
    return rArray[rValue - 1];
}

function checkY(y) {
    let elY = document.getElementById("y")
    elY.setCustomValidity("");
    let isYValid = true;
    if (y === '') {
        elY.setCustomValidity("Введите Y.");
        isYValid = false;
    } else if (/[^0-9,.+-]/.test(y)) {
        elY.setCustomValidity("В поле Y должны быть введенны цифры.");
        isYValid = false;
    } else if (!/^(\+?(([0-4]([.,]\d+)?)|5([.,]0+)?))$|(-(([0-2]([.,]\d+)?)|(3([,.]0+)?)))$/.test(y)) {
        elY.setCustomValidity("В Y введено значение, не входящие в интервал (-5; 3). ");
        isYValid = false;
    }
    return isYValid;
}

function checkX() {
    let elX = document.getElementById("x1");
    elX.setCustomValidity("");
    let isXValid = true;
    if (!xSelected()) {
        elX.setCustomValidity("Выберите X.");
        isXValid = false;
    }
    return isXValid;
}

function xSelected() {
    let first = document.getElementById("x1");
    let second = document.getElementById("x2");
    let third = document.getElementById("x3");
    let forth = document.getElementById("x4");
    let fifth = document.getElementById("x5");
    let sixth = document.getElementById("x6");
    let seventh = document.getElementById("x7");
    return first.checked || second.checked || third.checked || forth.checked || fifth.checked || sixth.checked || seventh.checked;

}

function getUrlVars() {
    let vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function request(x, y, r) {
    saveSession(x, y, r);
    passToJSFManagedBean(
        [
            {
                name: "x",
                value: x
            },
            {
                name: "y",
                value: y
            },
            {
                name: "r",
                value: r
            }
        ]
    );
}

// Обработка данных при клике на график
function clickOnArea() {
    let canvas = document.getElementById("canvas");
    let boundRect = canvas.getBoundingClientRect();
    let left = boundRect.left;
    let top = boundRect.top;

    let event = window.event;
    let x = event.clientX - left;
    let y = event.clientY - top;
    let r = 2;
    drawPoint(canvas.getContext('2d'), x, y, r);
    request((x - 150) / 120 * r, (150 - y) / 120 * r, r);
}

function drawPoint(context, x, y, r) {
    if (!isInArea((x - 150) / 120 * r, (150 - y) / 120 * r, r)) {
        context.fillStyle = "red";
    } else {
        context.fillStyle = "green";
    }
    context.beginPath();
    context.strokeStyle = "black";
    context.arc(x, y, 3, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
}

function isInArea(x, y, r) {
    let isInArea = false;
    if ((x <= 0 && y <= 0) && (x >= (-r / 2) && y >= -r)) {
        isInArea = true;
    } else if ((x >= 0 && y <= 0) && (Math.pow(x, 2) + Math.pow(y, 2) <= (Math.pow(r, 2)))) {
        isInArea = true;
    } else if ((y >= 0 && x <= 0) && (y <= (x + r / 2))) {
        isInArea = true;
    }
    return isInArea;
}

function saveSession(x, y, r) {
    let point = {
        x,
        y,
        r,
        date: new Date(),
        isInArea: isInArea(x, y, r)
    };
    let points = [];
    let pointsStr = sessionStorage.getItem("points");
    if (pointsStr != null) {
        points = JSON.parse(pointsStr);
    }
    points.push(point);
    //addRow(x,y,r,point.date, point.isInArea);
    sessionStorage.setItem("points", JSON.stringify(points));
}

function initPoints(r) {
    let points = [];
    let pointsStr = sessionStorage.getItem("points");
    if (pointsStr != null) {
        points = JSON.parse(pointsStr);
        for (let point of points) {
            drawPoint(document.getElementById("canvas").getContext('2d'), 120 * point.x / point.r + 150, 150 - 120 * point.y / point.r, sessionStorage.getItem("radiusValue"));
        }
    }
}

function drawCanvas(R){
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
    initPoints(R);
    ctx.closePath();
}

function updateRadius() {
    let previousR = sessionStorage.getItem("radiusValue");
    changeRadius(getRadiusElementByValue(previousR));
}

function changeRadius(clickedElement) {
    const rElems = document.getElementsByClassName("r");
    for (let el of rElems) {
        if (clickedElement.checked && !el.checked) {
            el.disabled = true;
        }
        if (!clickedElement.checked) {
            el.disabled = false;
        }
    }

    if (clickedElement.checked) {
        drawCanvas(getRFromForm());
        sessionStorage.setItem("radiusValue", getRFromForm());
    }
}

function renderRadius() {
    const rElems = document.getElementsByClassName("r");
    let hasChecked = false;
    for (let el of rElems) {
        if (el.checked) {
            hasChecked = true;
            break;
        }
    }
    if (hasChecked) {
        for (let el of rElems) {
            if (!el.checked) {
                el.disabled = true;
            }
        }
    }
}