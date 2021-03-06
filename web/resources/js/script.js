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
    let elY = document.getElementById("y");
    //elY.setCustomValidity("");
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
    let startX = canvas.height / 2;
    let startY = canvas.width / 2;
    let R = sessionStorage.getItem("radiusValue");
    let boundRect = canvas.getBoundingClientRect();
    let left = boundRect.left;
    let top = boundRect.top;

    let event = window.event;
    let x = event.clientX - left;
    let y = event.clientY - top;
    let r = sessionStorage.getItem("radiusValue");
    drawPoint(canvas.getContext('2d'), x, y, r);
    request((x - startX) / 30, (startY - y) / 30, r);
}

function drawPoint(context, x, y, r) {
    let canvas = document.getElementById("canvas");
    let startX = canvas.height / 2;
    let startY = canvas.width / 2;
    let R = sessionStorage.getItem("radiusValue");

    if (!isInArea((x - startX) / 150 * 5, (startY - y) / 150 * 5, r)) {
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
    r = sessionStorage.getItem("radiusValue");
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

function initPoints() {
    let points = [];
    let pointsStr = sessionStorage.getItem("points");
    if (pointsStr != null) {
        points = JSON.parse(pointsStr);
        for (let point of points) {
            drawPoint(document.getElementById("canvas").getContext('2d'), 30 * point.x + 180, 180 - 30 * point.y, point.r);
        }
    }
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
    let size = 360;
    canvas.height = size;
    canvas.width = size;
    //Single segment
    let i = (canvas.width / 2 - 30) / 5;
    R = R * i;
    let startX = canvas.height / 2;
    let startY = canvas.width / 2;
    ctx.fillStyle = '#3355ff';
    ctx.beginPath();

    //Triangle
    ctx.moveTo(startX, startY - R / 2);
    ctx.lineTo(startX - R / 2, startY);
    ctx.lineTo(startX, startY);
    ctx.fill();

    //Quadrant
    ctx.arc(startX, startY, R, 0, 0.5 * Math.PI, false);

    //Rectangle
    ctx.lineTo(startX - R / 2, startY + R);
    ctx.lineTo(startX - R / 2, startY);
    ctx.fill();

    //Lines
    ctx.strokeStyle = '#000000'; // colour of the lines
    ctx.strokeRect(startX, 0, 0, canvas.height); // y axis
    ctx.strokeRect(0, startY, canvas.width, 0); // x axis

    //Axes' arrows
    ctx.moveTo(startX, 0);
    ctx.lineTo(startX - 4, 10);
    ctx.moveTo(startX, 0);
    ctx.lineTo(startX + 4, 10);
    ctx.moveTo(canvas.width, startY);
    ctx.lineTo(canvas.width - 10, startY - 4);
    ctx.moveTo(canvas.width, startY);
    ctx.lineTo(canvas.width - 10, startY + 4);

    //X axe strokes
    ctx.moveTo(startX - i * 5, startY - 5);
    ctx.lineTo(startX - i * 5, startY + 5);
    ctx.moveTo(startX - i * 4, startY - 5);
    ctx.lineTo(startX - i * 4, startY + 5);
    ctx.moveTo(startX - i * 3, startY - 5);
    ctx.lineTo(startX - i * 3, startY + 5);
    ctx.moveTo(startX - i * 2, startY - 5);
    ctx.lineTo(startX - i * 2, startY + 5);
    ctx.moveTo(startX - i, startY - 5);
    ctx.lineTo(startX - i, startY + 5);
    ctx.moveTo(startX + i, startY - 5);
    ctx.lineTo(startX + i, startY + 5);
    ctx.moveTo(startX + i * 2, startY - 5);
    ctx.lineTo(startX + i * 2, startY + 5);
    ctx.moveTo(startX + i * 3, startY - 5);
    ctx.lineTo(startX + i * 3, startY + 5);
    ctx.moveTo(startX + i * 4, startY - 5);
    ctx.lineTo(startX + i * 4, startY + 5);
    ctx.moveTo(startX + i * 5, startY - 5);
    ctx.lineTo(startX + i * 5, startY + 5);


    //Y axe strokes
    ctx.moveTo(startX - 5, startY - i * 5);
    ctx.lineTo(startX + 5, startY - i * 5);
    ctx.moveTo(startX - 5, startY - i * 4);
    ctx.lineTo(startX + 5, startY - i * 4);
    ctx.moveTo(startX - 5, startY - i * 3);
    ctx.lineTo(startX + 5, startY - i * 3);
    ctx.moveTo(startX - 5, startY - i * 2);
    ctx.lineTo(startX + 5, startY - i * 2);
    ctx.moveTo(startX - 5, startY - i);
    ctx.lineTo(startX + 5, startY - i);
    ctx.moveTo(startX - 5, startY + i);
    ctx.lineTo(startX + 5, startY + i);
    ctx.moveTo(startX - 5, startY + i * 2);
    ctx.lineTo(startX + 5, startY + i * 2);
    ctx.moveTo(startX - 5, startY + i * 3);
    ctx.lineTo(startX + 5, startY + i * 3);
    ctx.moveTo(startX - 5, startY + i * 4);
    ctx.lineTo(startX + 5, startY + i * 4);
    ctx.moveTo(startX - 5, startY + i * 5);
    ctx.lineTo(startX + 5, startY + i * 5);

    ctx.stroke();

    //Signatures
    ctx.strokeText('-5', startX - i * 5, startY - 10, 20);
    ctx.strokeText('-4', startX - i * 4, startY - 10, 20);
    ctx.strokeText('-3', startX - i * 3, startY - 10, 20);
    ctx.strokeText('-2', startX - i * 2, startY - 10, 20);
    ctx.strokeText('-1', startX - i, startY - 10, 20);
    ctx.strokeText('1', startX + i, startY - 10, 20);
    ctx.strokeText('2', startX + i * 2, startY - 10, 20);
    ctx.strokeText('3', startX + i * 3, startY - 10, 20);
    ctx.strokeText('4', startX + i * 4, startY - 10, 20);
    ctx.strokeText('5', startX + i * 5, startY - 10, 20);
    ctx.strokeText('-5', startX + 10, startY + i * 5, 20);
    ctx.strokeText('-4', startX + 10, startY + i * 4, 20);
    ctx.strokeText('-3', startX + 10, startY + i * 3, 20);
    ctx.strokeText('-2', startX + 10, startY + i * 2, 20);
    ctx.strokeText('-1', startX + 10, startY + i, 20);
    ctx.strokeText('1', startX + 10, startY - i, 20);
    ctx.strokeText('2', startX + 10, startY - i * 2, 20);
    ctx.strokeText('3', startX + 10, startY - i * 3, 20);
    ctx.strokeText('4', startX + 10, startY - i * 4, 20);
    ctx.strokeText('5', startX + 10, startY - i * 5, 20);
    ctx.strokeText("x", canvas.width - 10, startY - 10, 20);
    ctx.strokeText("y", startX + 10, 10, 20);
    initPoints(R);
    ctx.closePath();
}


function updateRadius() {
    let previousR = sessionStorage.getItem("radiusValue");
    if (previousR != null) {
        let element = getRadiusElementByValue(previousR);
        element.checked = true;
        changeRadius(element);
    } else {
        let element = getRadiusElementByValue(2);
        element.checked = true;
        changeRadius(element);
    }
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
        sessionStorage.setItem("radiusValue", getRFromForm());
        drawCanvas(getRFromForm());
        initPoints();
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