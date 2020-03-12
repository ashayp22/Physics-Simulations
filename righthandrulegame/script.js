//javascript code here

var timer;
var time;

var difficulty; //1 is easy, 2 is medium, 3 is hard

var clickedCanvas = false;

var points;

var selected1 = false;
var selected2 = false;
//handles mouse events
var initialTime = 60;

$(document).ready(function(){ //onload

    easy = []; //format: [[angle, center, length],...]
    medium = [];

    time = initialTime;
    points = 0;
    inPos = new Point(100, 100);
    outPos = new Point(100, 200);

    updateTimer()

    var canvas = document.getElementById("canvas");

    $("#canvas").mousedown(function() {
        clickedCanvas = true;
    });

    canvas.addEventListener('touchstart', function(e) {
        e.preventDefault();
        clickedCanvas = true;
    }, { passive: false });

    $("#canvas").mouseup(function() {
        clickedCanvas = false;
        selected1 = false;
        selected2 = false;
    });

    canvas.addEventListener('touchend', function(e) {
        e.preventDefault();
        clickedCanvas = false;
        selected1 = false;
        selected2 = false;
    }, { passive: false });


    canvas.addEventListener("mousemove", setMousePosition, { passive: false }); //adds a mouse move event listener to the canvas

    document.addEventListener('touchmove', setTouchPosition, { passive: false });

    function setTouchPosition(e) {
        if(clickedCanvas) { //if the canvas is clicked
            e.preventDefault();
            var touch = e.touches[0];

            var canvas = document.getElementById("canvas");
            //source: https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
            var rect = canvas.getBoundingClientRect();
            //in order to get mouse position based on its positon on the canvas, the coordinates of the actual canvas on the screen are subtracted
            var newX = touch.clientX - rect.left;
            var newY = touch.clientY - rect.top;


            if(difficulty === 1) {

                if((Math.abs(newX - inPos.x) < 30 && Math.abs(newY - inPos.y) < 30) || selected1) {
                    inPos.x = newX;
                    inPos.y = newY;
                    selected1 = true;
                } else if((Math.abs(newX - outPos.x) < 30 && Math.abs(newY - outPos.y) < 30) || selected2) {
                    outPos.x = newX;
                    outPos.y = newY;
                    selected2 = true;
                }
            } else if (difficulty === 2) {

                let forcePoint = new Point(400 + 100 * Math.cos(forceAngle * Math.PI / 180), 150 - 100 * Math.sin(forceAngle * Math.PI / 180));
                if((Math.abs(forcePoint.x - newX) < 30 && Math.abs(forcePoint.y - newY) < 30) || selected1) {

                    forceAngle = angleBetweenTwoPoints(400, 150, newX, 300 - newY);
                    selected1 = true;
                }

            } else if(difficulty === 3) {
                let forcePoint = new Point(400 + 100 * Math.cos(ForceAngle3 * Math.PI / 180), 150 - 100 * Math.sin(ForceAngle3 * Math.PI / 180));
                if((Math.abs(forcePoint.x - newX) < 30 && Math.abs(forcePoint.y - newY) < 30) || selected1) {

                    ForceAngle3 = angleBetweenTwoPoints(400, 150, newX, 300 - newY);
                    selected1 = true;
                }
            } else if(difficulty === 4) {

            }

        }

    }

    function setMousePosition(e) {

        if(clickedCanvas) { //if the canvas is clicked

            //move particle to a new location on the canvas
            // var newX = e.clientX - canvasPos.x;
            // var newY = e.clientY - canvasPos.y;

            var canvas = document.getElementById("canvas");
            //source: https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
            var rect = canvas.getBoundingClientRect();
            //in order to get mouse position based on its positon on the canvas, the coordinates of the actual canvas on the screen are subtracted
            var newX = e.clientX - rect.left;
            var newY = e.clientY - rect.top;


            if(difficulty === 1) {

                if((Math.abs(newX - inPos.x) < 30 && Math.abs(newY - inPos.y) < 30) || selected1) {
                    inPos.x = newX;
                    inPos.y = newY;
                    selected1 = true;
                } else if((Math.abs(newX - outPos.x) < 30 && Math.abs(newY - outPos.y) < 30) || selected2) {
                    outPos.x = newX;
                    outPos.y = newY;
                    selected2 = true;
                }
            } else if (difficulty === 2) {

                let forcePoint = new Point(400 + 100 * Math.cos(forceAngle * Math.PI / 180), 150 - 100 * Math.sin(forceAngle * Math.PI / 180));
                if((Math.abs(forcePoint.x - newX) < 30 && Math.abs(forcePoint.y - newY) < 30) || selected1) {

                    forceAngle = angleBetweenTwoPoints(400, 150, newX, 300 - newY);
                    selected1 = true;
                }

            } else if(difficulty === 3) {
                let forcePoint = new Point(400 + 100 * Math.cos(ForceAngle3 * Math.PI / 180), 150 - 100 * Math.sin(ForceAngle3 * Math.PI / 180));
                if((Math.abs(forcePoint.x - newX) < 30 && Math.abs(forcePoint.y - newY) < 30) || selected1) {

                    ForceAngle3 = angleBetweenTwoPoints(400, 150, newX, 300 - newY);
                    selected1 = true;
                }
            } else if(difficulty === 4) {

            }

        }
    }

});



//handles touch events


//deciding the gamemode

function chooseEasy() {
    difficulty = 1;
    hideDifficulty();
    clearCanvas();
    showGame();
    generateEasy();
    timer = setTimeout(decreaseTimer, 1000);
    animate()
}

function chooseMedium() {
    difficulty = 2;
    hideDifficulty();
    clearCanvas();
    showGame();
    generateMedium();
    timer = setTimeout(decreaseTimer, 1000);
    animate()
}

function chooseHard() {
    difficulty = 3;
    hideDifficulty();
    clearCanvas();
    showGame();
    generateHard();
    timer = setTimeout(decreaseTimer, 1000);
    animate()
}

function chooseFlux() {
    difficulty = 4;
    hideDifficulty();
    clearCanvas();
    showGame();
    generateFlux();
    timer = setTimeout(decreaseTimer, 1000);
    animate()
}

function showGame() {
    document.getElementById("game").style.visibility = "visible";
    document.getElementById("game").style.display = "inline";
}

function hideGame() {
    document.getElementById("game").style.visibility = "hidden";
    document.getElementById("game").style.display = "none";
}

function showDifficulty() {
    document.getElementById("difficulty").style.visibility = "visible";
    document.getElementById("difficulty").style.display = "inline";
}

function hideDifficulty() {
    document.getElementById("difficulty").style.visibility = "hidden";
    document.getElementById("difficulty").style.display = "none";
}

//drawing the canvas

function animate() { //animate function, called every frame
    var a = requestAnimationFrame(animate);
    clearCanvas();


    if(difficulty === 1) {
        drawBorder();
        drawDraggables();
        drawEasy()

    } else if(difficulty === 2) {
        drawBorder();
        drawMedium();
    } else if(difficulty === 3) {
        drawBorder();
        drawHard();
    } else if(difficulty === 4) {
        drawWiderBorder();
        drawFlux();
    }

}

function stopAnimation() {
    cancelAnimationFrame(a);
}

function clearCanvas() {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.rect(0, 0, c.width, c.height);
    ctx.fillStyle = "#ededed";
    ctx.fill();
}

function decreaseTimer() {
    time -= 1;
    updateTimer();
    if(time > 0) {
        timer = setTimeout(decreaseTimer, 1000)
    }
}

function updateTimer() {
    let minutes = Math.floor(time/60);
    let seconds = time % 60;

    minutes += "";
    seconds += "";

    if (seconds.length === 1) {
        seconds = "0" + seconds
    }


    if(time <= 0) {
        document.getElementById("timer").innerHTML = "0:00";
        //show modal
        document.getElementById("myModal").style.display = "inline-block";
        document.getElementById("myModal").style.visible = "visible";
        document.getElementById("modalScore").innerHTML = "You got a score of " + points;

    } else {
        document.getElementById("timer").innerHTML = minutes + ":" + seconds;
    }

}

function hideModal() {
    document.getElementById("myModal").style.display = "none";
    document.getElementById("myModal").style.visible = "hidden";
}

//code for flux

var fluxField;
var scenario;

function generateFlux() {

    document.getElementById("clock").style.visibility = "visible";
    document.getElementById("clock").style.display = "inline-block";

    document.getElementById("counter").style.visibility = "visible";
    document.getElementById("counter").style.display = "inline-block";

    //direction of magnetic field
    if(Math.random() > 0.5) {
        fluxField = "in";
    } else {
        fluxField = "out";
    }


    var chance = Math.random();

    if(chance <= .16) {
        scenario = "off";
        document.getElementById("info").innerHTML = "The magnetic field is turned off.<br>What direction will current flow?";
    } else if(chance <= .16) {
        scenario = "on";
        document.getElementById("info").innerHTML = "The magnetic field is turned on.<br>What direction will current flow?";
    } else if(chance <= .33) {
        scenario = "shrink";
        document.getElementById("info").innerHTML = "The wire shrinks.<br>What direction will current flow?";
    } else if(chance <= .5) {
        scenario = "enlarge";
        document.getElementById("info").innerHTML = "The wire enlarges.<br>What direction will current flow?";
    } else if(chance <= .83) {
        scenario = "enter";
        document.getElementById("info").innerHTML = "The wire enters the magnetic field.<br>What direction will current flow?";
    } else if(chance <= 1) {
        scenario = "leave";
        document.getElementById("info").innerHTML = "The wire leaves the magnetic field.<br>What direction will current flow?";
    }

}

function drawFlux() {
    //draw the magnetic field
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.font = "22px Verdana";
    ctx.fillStyle = "#000000";
    if(scenario === "enter") {
        ctx.fillText("wire enters field", 300, 50);
        drawMagneticField(fluxField, new Point(500, 75));
        drawArrow(350, 150, 450, 150);
        drawCircle(new Point(250, 150), 75)
    } else if(scenario === "leave") {
        ctx.fillText("wire leaves field", 300, 50);
        drawMagneticField(fluxField, new Point(500, 75));
        drawArrow(450, 150, 350, 150);
        drawCircle(new Point(250, 150), 75)
    } else if(scenario === "off") {
        ctx.fillText("shown with the magnetic field before its turned off", 125, 50);
        drawMagneticField(fluxField, new Point(325, 75));
        drawCircle(new Point(400, 150), 50);
    } else if(scenario === "on") {
        ctx.fillText("shown with the magnetic field after its turned on", 125, 50);
        drawMagneticField(fluxField, new Point(325, 75));
        drawCircle(new Point(400, 150), 50);
    } else if(scenario === "enlarge") {
        drawMagneticField(fluxField, new Point(325, 75));
        drawArrow(400, 115, 400, 75); //up arrow
        drawArrow(435, 150, 475, 150); //right arrow
        drawArrow(400, 185, 400, 225); //down arrow
        drawArrow(365, 150, 325, 150); //left arrow
        drawCircle(new Point(400, 150), 25);
        drawCircle(new Point(400, 150), 100);
    } else if(scenario === "shrink") {
        drawMagneticField(fluxField, new Point(325, 75));
        drawArrow(400, 75, 400, 115); //up arrow
        drawArrow(475, 150, 435, 150); //right arrow
        drawArrow(400, 225, 400, 185); //down arrow
        drawArrow(325, 150, 365, 150); //left arrow
        drawCircle(new Point(400, 150), 25);
        drawCircle(new Point(400, 150), 100);
    }

}

function drawWiderBorder() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.strokeStyle = "#000000";
    ctx.beginPath();
    ctx.moveTo(100, 10);
    ctx.lineTo(100, 290);
    ctx.lineTo(700, 290);
    ctx.lineTo(700, 10);
    ctx.lineTo(100, 10);
    ctx.stroke();
}

function drawCircle(point, radius) {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.strokeStyle = "#ff1510";
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

function clockwise() {
    if (scenario === "off" && fluxField === "in") {
        won();
    } else if (scenario === "on" && fluxField === "out") {
        won();
    } if (scenario === "enter" && fluxField === "out") {
        won();
    } else if (scenario === "leave" && fluxField === "in") {
        won();
    } else if (scenario === "enlarge" && fluxField === "out") {
        won();
    } else if (scenario === "shrink" && fluxField === "in") {
        won();
    } else {
        lost();
    }

    generateFlux();


}

function counterwise() {
    if (scenario === "off" && fluxField === "out") {
        won();
    } else if (scenario === "on" && fluxField === "in") {
        won();
    } else if (scenario === "leave" && fluxField === "out") {
        won();
    } else if (scenario === "enter" && fluxField === "in") {
        won();
    } else if (scenario === "enlarge" && fluxField === "in") {
        won();
    } else if (scenario === "shrink" && fluxField === "out") {
        won();
    } else {
        lost();
    }

    generateFlux();

}

//code for the third gamemode

var hard;
var field;
var charge;
var ForceAngle3;

function generateHard() {
    document.getElementById("info").innerHTML = "Drag the tip of the Force Vector to the correct direction";
    document.getElementById("clock").style.visibility = "hidden";
    document.getElementById("clock").style.display = "none";

    document.getElementById("counter").style.visibility = "hidden";
    document.getElementById("counter").style.display = "none";

    //direction of magnetic field
    if(Math.random() > 0.5) {
        field = "in";
    } else {
        field = "out";
    }

    //charge

    if(Math.random() > 0.5) {
        charge = "+";
    } else {
        charge = "-";
    }

    //draws a line on the screen

    hard = [];

    let angle = getRandomNumber(0, 360) * (Math.PI / 180);
    let l = 100;
    hard.push(new Point(400 + l * Math.cos(angle), 150 - l * Math.sin(angle)));
    hard.push(new Point(400 - l * Math.cos(angle), 150 + l * Math.sin(angle)));

    //force angle

    ForceAngle3 = getRandomNumber(0, 360);

}

function drawHard() {
    //draw the magnetic field
    drawMagneticField(field, new Point(325, 75));
    //draw the line

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    drawArrow(hard[0].x, hard[0].y, hard[1].x, hard[1].y, "#ff1010");

    //draw current symbol
    let angle = angleBetweenTwoPoints(hard[0].x, 300 - hard[0].y, hard[1].x, 300 - hard[1].y);
    angle *= (Math.PI / 180);
    let l = 20;
    ctx.fillStyle = "#000";
    ctx.font = "25px Times New Roman";
    ctx.fillText(charge + "Q", hard[1].x + l * Math.cos(angle), hard[1].y - l * Math.sin(angle));

    //draw the force angle

    let l3 = 100;
    let point3 = new Point(400 + l3 * Math.cos(ForceAngle3 * Math.PI / 180), 150 - l3 * Math.sin(ForceAngle3 * Math.PI / 180));
    drawArrow(400, 150, point3.x, point3.y, "#1010ff");

    //draw force symbol
    ctx.fillStyle = "#000";
    ctx.font = "25px Times New Roman";
    ctx.fillText("F", point3.x + l * Math.cos(ForceAngle3 * Math.PI / 180), point3.y - 20 * Math.sin(ForceAngle3 * Math.PI / 180));

}

function drawMagneticField(direction, startingPoint) {

    if(direction === "in") {
        for(var i = 0; i < 4; i++) {
            for(var j = 0; j < 4; j++) {
                drawX(new Point(startingPoint.x + i * 50, startingPoint.y + j * 50), 5)
            }
        }
    } else if(direction === "out") {
        for(var i = 0; i < 4; i++) {
            for(var j = 0; j < 4; j++) {
                drawDot(new Point(startingPoint.x + i * 50, startingPoint.y + j * 50), .35)
            }
        }
    }

}


//code for the second gamemode

var medium;

var sides;

var forceAngle;

function generateMedium() {
    document.getElementById("clock").style.visibility = "hidden";
    document.getElementById("clock").style.display = "none";

    document.getElementById("counter").style.visibility = "hidden";
    document.getElementById("counter").style.display = "none";
    document.getElementById("info").innerHTML = "Drag the tip of the Force Vector to the correct direction";

    //draws a line on the screen

    medium = [];

    let angle = getRandomNumber(0, 360) * (Math.PI / 180);
    let l = 100;
    medium.push(new Point(400 + l * Math.cos(angle), 150 - l * Math.sin(angle)));
    medium.push(new Point(400 - l * Math.cos(angle), 150 + l * Math.sin(angle)));


    //adds in x or o

    if(Math.random() < 0.5) {
        sides = "in"; //x
    } else {
        sides = "out"; //o
    }

    forceAngle = getRandomNumber(0, 360);

}

function drawMedium() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    for (var i = 0; i < medium.length - 1; i++) {
        drawArrow(medium[i].x, medium[i].y, medium[i+1].x, medium[i+1].y, "#ff1010");

        //draw current symbol
        let angle = angleBetweenTwoPoints(medium[i].x, 300 - medium[i].y, medium[i+1].x, 300 - medium[i+1].y);
        angle *= (Math.PI / 180);
        let l = 20;
        ctx.fillStyle = "#000";
        ctx.font = "25px Times New Roman";
        ctx.fillText("I", medium[i+1].x + l * Math.cos(angle), medium[i+1].y - l * Math.sin(angle));

        //drawing the x and o on both sides of the current (magnetic field)

        drawMagneticField(sides, new Point(325, 75));

        // let l2 = 50;
        // let angle1 = angle - Math.PI/2;
        // let angle2 = angle + Math.PI/2;
        //
        // let pt1 = new Point(400 + l2 * Math.cos(angle1), 150 - 12 * Math.sin(angle1));
        // let pt2 = new Point(400 + l2 * Math.cos(angle2), 150 - 12 * Math.sin(angle2));
        //
        // if(sides === "in") {
        //     drawX(pt1, 10);
        //     drawX(pt2, 10);
        // } else if(sides === "out") {
        //     drawDot(pt1, .5);
        //     drawDot(pt2, .5);
        // }

    }

    //draw the force angle

    let l3 = 100;
    let point3 = new Point(400 + l3 * Math.cos(forceAngle * Math.PI / 180), 150 - l3 * Math.sin(forceAngle * Math.PI / 180));
    drawArrow(400, 150, point3.x, point3.y, "#1010ff");

    //draw force symbol
    let l = 20;
    ctx.fillStyle = "#000";
    ctx.font = "25px Times New Roman";
    ctx.fillText("F", point3.x + l * Math.cos(forceAngle * Math.PI / 180), point3.y - l * Math.sin(forceAngle * Math.PI / 180));

}


//code for the easy gamemode

//easy mode - only current flowing - line, multiple lines

var easy; //format: [[start, end],...]

var inPos;
var outPos;

function drawBorder() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.strokeStyle = "#000000";

    ctx.beginPath();
    ctx.moveTo(200, 10);
    ctx.lineTo(200, 290);
    ctx.lineTo(600, 290);
    ctx.lineTo(600, 10);
    ctx.lineTo(200, 10);
    ctx.stroke();
}

function drawDraggables() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#000000";
    drawX(inPos, 20);
    drawDot(outPos, 1);

}

function drawX(pos, length) {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#000000";

    ctx.beginPath();
    ctx.moveTo(pos.x - length, pos.y - length);
    ctx.lineTo(pos.x + length, pos.y + length);
    ctx.moveTo(pos.x + length, pos.y - length);
    ctx.lineTo(pos.x - length, pos.y + length);
    ctx.stroke();

}

function drawDot(pos, sizeFactor) {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#000000";

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 20 * sizeFactor, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 5 * sizeFactor, 0, 2 * Math.PI);
    ctx.fill()
}

function generateEasy() {
    document.getElementById("clock").style.visibility = "hidden";
    document.getElementById("clock").style.display = "none";

    document.getElementById("counter").style.visibility = "hidden";
    document.getElementById("counter").style.display = "none";
    document.getElementById("info").innerHTML = "Move the x and o to the correct side of the flowing current";

    inPos = new Point(100, 100);
    outPos = new Point(100, 200);
    easy = [];

    let angle = getRandomNumber(0, 360) * (Math.PI / 180);
    let l = 100;
    easy.push(new Point(400 + l * Math.cos(angle), 150 - l * Math.sin(angle)));
    easy.push(new Point(400 - l * Math.cos(angle), 150 + l * Math.sin(angle)));

}

function drawEasy() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    for (var i = 0; i < easy.length - 1; i++) {
        drawArrow(easy[i].x, easy[i].y, easy[i+1].x, easy[i+1].y, "#ee1010");

        let angle = angleBetweenTwoPoints(easy[i].x, 300 - easy[i].y, easy[i+1].x, 300 - easy[i+1].y);
        angle *= (Math.PI / 180);
        let l = 20;
        ctx.fillStyle = "#000";
        ctx.font = "25px Times New Roman";
        ctx.fillText("I", easy[i+1].x + l * Math.cos(angle), easy[i+1].y - l * Math.sin(angle));

    }
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

//draws arrow
function drawArrow(fromx, fromy, tox, toy, color) {

    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.strokeStyle = color;

    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
}

function check() {
    //check if the user has won

    if(difficulty === 1) {


        // 1.) Figure out the equation of each line of current
        // 2.) Find the line closest to the draggable. If the linee extends out, don't consider it
        // 3.) Using the angle method, decide if the draggable is to the left or right
        // 4.) If the in draggable is to the right and the out draggable is to the left, then the user wins


        var inSide = "";
        var outSide = "";

        //convert into correct coordinate system

        var temp_In = new Point(inPos.x, 300 - inPos.y);
        var temp_Out = new Point(outPos.x, 300 - outPos.y);
        var tempEasy = [];

        for(var i = 0; i < easy.length; i++) {
            tempEasy.push(new Point(easy[i].x, 300 - easy[i].y));
        }

        //Step 1

        var equations = []; //format [[m, b, startX, endX]...]
        var direction = []; //up or down


        for(var i = 0; i < tempEasy.length - 1; i++) {
            var m = Math.tan(angleBetweenTwoPoints(tempEasy[i].x, tempEasy[i].y, tempEasy[i+1].x, tempEasy[i+1].y) * (Math.PI/180));
            var b = tempEasy[i].y - (m * tempEasy[i].x);
            equations.push([m, b, tempEasy[i].x, tempEasy[i+1].x]);

            if(tempEasy[i+1].y > tempEasy[i].y) {
                direction.push("up")
            } else {
                direction.push("down");
            }
        }


        var inSmallest = closestLine(equations, temp_In);
        var outSmallest = closestLine(equations, temp_Out);

        if(inSmallest === -1 || outSmallest === -1) { //lost
            lost();

            //reset
            generateEasy();
        } else {
            //figure out in

            inSide = decideSide(equations[inSmallest], temp_In, direction[inSmallest]);
            outSide = decideSide(equations[outSmallest], temp_Out, direction[outSmallest]);


            if (outSide === "left" && inSide === "right") { //user got it correct
                won();

                //reset
                generateEasy();

            } else {
                lost();

                //reset
                generateEasy();

            }

        }
    } else if(difficulty === 2) {

        if(sides === "in") {

            //force should be 90 degrees rotated counterclockwise
            let angle = angleBetweenTwoPoints(medium[0].x, 300 - medium[0].y, medium[1].x, 300 - medium[1].y);

            let correctAngle = angle + 90;

            if(correctAngle > 360) {
                correctAngle -= 360;
            }


            if(Math.abs(correctAngle - forceAngle) <= 20) { //won
                won();

                //reset
                generateMedium();
            } else { //lost
                lost();

                //reset
                generateMedium();
            }



        } else if(sides === "out") {
            //force should be 90 degrees rotated clockwise
            let angle = angleBetweenTwoPoints(medium[0].x, 300 - medium[0].y, medium[1].x, 300 - medium[1].y);

            let correctAngle = angle - 90;

            if(correctAngle < 0) {
                correctAngle += 360;
            }


            if(Math.abs(correctAngle - forceAngle) <= 20) { //won
                won();

                //reset
                generateMedium();
            } else { //lost
                lost();

                //reset
                generateMedium();
            }


        }


    } else if(difficulty === 3) {
        if(field === "in") {

            //force should be 90 degrees rotated counterclockwise
            let angle = angleBetweenTwoPoints(hard[0].x, 300 - hard[0].y, hard[1].x, 300 - hard[1].y);

            var correctAngleRight = angle + 90;

            if(correctAngleRight > 360) {
                correctAngleRight -= 360;
            }

            var correctAngleLeft = angle - 90;

            if(correctAngleLeft < 0) {
                correctAngleLeft += 360;
            }

            if(charge === "+") {
                if(Math.abs(correctAngleRight - ForceAngle3) <= 20) { //won
                    won();

                    //reset
                    generateHard();
                } else { //lost
                    lost();

                    //reset
                    generateHard();
                }
            } else if(charge === "-") {
                if(Math.abs(correctAngleLeft - ForceAngle3) <= 20) { //won
                    won();

                    //reset
                    generateHard();
                } else { //lost
                    lost();

                    //reset
                    generateHard();
                }
            }
        } else if(field === "out") {
            //force should be 90 degrees rotated clockwise
            let angle = angleBetweenTwoPoints(hard[0].x, 300 - hard[0].y, hard[1].x, 300 - hard[1].y);

            var correctAngleRight = angle - 90;

            if(correctAngleRight < 0) {
                correctAngleRight += 360;
            }

            var correctAngleLeft = angle + 90;

            if(correctAngleLeft > 360) {
                correctAngleLeft -= 360;
            }

            if(charge === "+") {
                if(Math.abs(correctAngleRight - ForceAngle3) <= 20) { //won
                    won();

                    //reset
                    generateHard();
                } else { //lost
                    lost();

                    //reset
                    generateHard();
                }
            } else if(charge === "-") {
                if(Math.abs(correctAngleLeft - ForceAngle3) <= 20) { //won
                    won();

                    //reset
                    generateHard();
                } else { //lost
                    lost();

                    //reset
                    generateHard();
                }
            }
        }
    }

}


function won() {
    points += 10;
    time += 5;
    updateTimer();
    document.getElementById("points").innerHTML = "Points: " + points;
}

function lost() {
    points -= 5;
    time -= 5;
    document.getElementById("points").innerHTML = "Points: " + points;
}

function closestLine(lines, point) { //passed in a line of lines [[m, b]...] and (x,y) and returns the index in lines that is closest

    var smallest_distance = 1000000;
    var smallest_index = -1;

    for(var i = 0; i < lines.length; i++) {
        //first determine if the line going through the point and perpendicular to the current line is between the correct range

        var m1 = lines[i][0];
        var b1 = lines[i][1];

        //first determine if the line going through the point and perpendicular to the current line is between the correct range

        var x1 = lines[i][2];
        var x2 = lines[i][3];

        if (x2 > x1) { //makes x1 larger
            x1 = lines[i][3];
            x2 = lines[i][2];
        }

        //perpendicular line
        var m2 = -1/m1;
        var b2 = point.y - (m2 * point.x);

        //now figure out the point on the current line going through the perpendicular point

        var x = (b1 - b2) / (m2 - m1);

        if (x > x2 && x < x1 && !(intersectsWithLines(lines, i, [m2, b2, x, point.x]))) { //within range and doesn't interset with any lines
            //calculate distance
            //|ax+by-c| / sqrt(a^2+b^2)
            var distance = Math.abs(-1 * (m1 * point.x) + point.y - b1) / Math.sqrt(Math.pow(-1 * m1, 2) + Math.pow(1, 2));
            if(distance < smallest_distance) {
                smallest_distance = distance;
                smallest_index = i;
            }
        }
    }


    //now check to see if the point is within the range of the closest line

    return smallest_index;
}

function intersectsWithLines(allLines, index, line) {

    for(var i = 0; i < allLines.length; i++) {
        if(i === index) {
            continue;
        }

        if(intersectsWithLine(allLines[i], line)) {
            return true;
        }

    }

    return false
}

function intersectsWithLine(line1, line2) {

    var m1 = line1[0];
    var b1 = line1[1];
    var x11 = line1[2];
    var x12 = line1[3];

    if(x12 > x11) { //makes x11 greater
        x11 = line1[3];
        x12 = line1[2];
    }


    var m2 = line2[0];
    var b2 = line2[1];
    var x21 = line2[2];
    var x22 = line2[3];

    if(x22 > x21) { //makes x21 greater
        x21 = line2[3];
        x22 = line2[2];
    }

    //find intersection x

    var x = (b1 - b2) / (m2 - m1);

    return x < x21 && x > x22 && x < x11 && x > x12; //x fits within the x domain of both lines

}

function decideSide(line, point, direction) {

    let m = line[0];
    let b = line[1];

    if(m < 0) { //slope is negative

        var line_y = point.x * m + b;

        console.log(line_y)
        console.log(point.y)

        if(line_y < point.y) { //above the line

            if(direction === "up") {
                console.log("n, a, u")
                return "right"
            } else if(direction === "down") {
                console.log("n, a, d")
                return "left"
            }

        } else { //below the line

            if(direction === "up") {
                console.log("n, b, u")
                return "left"
            } else if(direction === "down") {
                console.log("n, b, d")
                return "right"
            }
        }

    } else { //slope is positive
        line_y = point.x * m + b;

        if(line_y < point.y) { //above the line
            if(direction === "up") {
                console.log("p, a, u")
                return "left"
            } else if(direction === "down") {
                console.log("p, a, d")
                return "right"
            }
        } else { //below the line
            if(direction === "up") {
                console.log("p, b, u")
                return "right"
            } else if(direction === "down") {
                console.log("p, b, d")
                return "left"
            }
        }
    }

}

function angleBetweenTwoPoints(x1, y1, x2, y2) { //angle between two points - x1/y1 should be the center

    var x = x2 - x1;
    var y = y2 - y1;

    var theta = 0;

    if(x === 0) {
        if(y >= 0) {
            theta = 90;
        } else {
            theta = 180
        }
    } else {
        theta = Math.atan(Math.abs(y/x));
        theta *= (180 / Math.PI);

        if(x < 0 && y >= 0) { //quadrant 2
            theta = 180 - theta;
        } else if(x < 0 && y < 0) { //quadrant 3
            theta = 180 + theta;
        } else if(x >= 0 && y < 0) { //quadrant 4
            theta = 360 - theta;
        }

    }

    return theta //degree mode
}


// function decideSide(centerPoint, centerAngle, otherPoint) {
//
//     //to figure out what side, draw a line from the center to the two draggables. Then, figure out the angle between  the
//     //line the the horizontal axis. If that angle minus the current line's angle is less than 180, it is on the left. Otherwise,
//     //it is on the right
//
//     var center = centerPoint;
//     var angle = centerAngle;
//
//
//     var theta = angleBetweenTwoPoints(center.x, center.y, otherPoint.x, otherPoint.y);
//
//
//     var angle2 = angle + 180;
//
//     if(angle2 > 360) {
//         angle2 -= 360;
//     }
//
//     //when starting at theta and moving counter clockwise, if the first point you hit is angle,
//     //then your are on the right. if the first point you hit is angle2, then you are on the left
//
//     theta = Math.floor(theta);
//     angle = Math.floor(angle);
//     angle2 = Math.floor(angle2);
//
//     var done = false;
//
//     var side = "";
//
//     while(!done) {
//         if(theta === angle) {
//             side = "right";
//             done = true;
//         } else if(theta === angle2) {
//             side = "left";
//             done = true;
//         }
//         theta += 1;
//
//         if(theta === 360) {
//             theta = 0;
//         }
//
//     }
//
//     return side;
// }

function menu() {
    hideModal();
    clearTimeout(timer);
    time = initialTime;
    updateTimer();
    points = 0;
    document.getElementById("points").innerHTML = "Points: " + points;
    clearCanvas();

    showDifficulty();
    clearCanvas();
    hideGame();
    stopAnimation();

}

function restart() {
    hideModal();
    clearTimeout(timer);
    time = initialTime;
    updateTimer();
    points = 0;
    document.getElementById("points").innerHTML = "Points: " + points;

    clearCanvas();
    timer = setTimeout(decreaseTimer, 1000);

    //reset

    if(difficulty === 1) {
        generateEasy();
    } else if(difficulty === 2) {
        generateMedium();
    } else {
        generateHard()
    }

}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function showHelp() {
    document.getElementById("help").style.display = "inline-block";
    document.getElementById("help").style.visibility = "visible";
    hideDifficulty();
}

function hideHelp() {
    document.getElementById("help").style.display = "none";
    document.getElementById("help").style.visibility = "hidden";
    showDifficulty();
}