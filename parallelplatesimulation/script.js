//javascript code here

var clickedCanvas = false;

//electron
var particleX = 10; //in px
var particleY = 250; //in px

var particle_velocityX = 3 * Math.pow(10, 6); //m / s
var particle_velocityY = 0;

var electric_field = 178; //N / C
var particle_mass = 9.1; //times 10^-31
var particle_charge = -1.6; //times 10^-19, charge is really negative but coordinate grid is upside down

var voltage = 8.9; //V
var capacitance = 1.77; //e-13 Farads
var area = 0.001; //m^2
var distance = 0.05; //m
var plate_charge = 1.58; //e-12 C

var width = 100; //mm

var doPhysics = false;

var canChange = true;

var particle_path = [];
var particle_path_fill = randomColor();

var blockWidth = 500; //in px; 5 px == 1 mm

$(document).ready(function(){ //onload

    $("#canvas").mousedown(function() {
        clickedCanvas = true;
    });

    $("#canvas").mouseup(function() {
        clickedCanvas = false;
    });

    var canvas = document.getElementById("canvas");

    var canvasPos = getPosition(canvas);

    canvas.addEventListener("mousemove", setMousePosition, false); //adds a mouse move event listener to the canvas

    function setMousePosition(e) {

    	if(clickedCanvas) { //if the canvas is clicked

    	    //move particle to a new location on the canvas
    	    var newX = e.clientX - canvasPos.x;
    	    var newY = e.clientY - canvasPos.y;

    	    if (newX >= 10 && newX <= 10 + blockWidth) { //within range of canvas
                particleX = e.clientX - canvasPos.x;

            }

            if(newY >= 150 && newY <=  150 + (distance * 1000 * 5)) { //within range of canvas
                particleY = e.clientY - canvasPos.y;
            }
            setData(0); //updates positition and force of particle on screen
    	}
    }

    //gets the position of the mouse on the screen
    function getPosition(el) {
        var xPosition = 0;
        var yPosition = 0;

        while (el) {
            xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
            el = el.offsetParent;
        }
        return {
            x: xPosition,
            y: yPosition
        };
    }


});

//returns a random color
function randomColor() {
    var r = randomInt(0, 255);
    var g = randomInt(0, 255);
    var b = randomInt(0, 255);
    var min = 100;
    while(r < min && g < min && b < min) {
        r = randomInt(0, 255);
        g = randomInt(0, 255);
        b = randomInt(0, 255);
    }

    return "#" + (r.toString(16)) + (g.toString(16)) + (b.toString(16));

}

//random integer, inclusive of both
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  //rounds a number to hundreths place
function round(value) {
    value *= 100;
    value = Math.round(value);
    value /= 100;
    return value;
}

//applies physics to the particle and updates position
function chargePhysics(tChange) { //tChange is in picoseconds (1e-12 seconds)
	//calculate force applied

	var force = electric_field * particle_charge; //times 10^-19
    setData(force); //update data on screen
	var acceleration = force / particle_mass; //times 10^12, in m / s^2

	//apply acceleration

	particle_velocityY += acceleration * tChange; //m / s

	//change position

	//convert px to mm

	particleX /= 5;
	particleY /= 5;

	//convert mm to m

	particleX /= 1000;
	particleY /= 1000;


	//apply velocity

    particleX += particle_velocityX * tChange * Math.pow(10,-12);
    particleY += -particle_velocityY * tChange * Math.pow(10,-12);

	//convert m to mm

	particleX *= 1000;
	particleY *= 1000;

	//convert mm to px; 5 px = 1mm

    particleX *= 5;
    particleY *= 5;

    particle_path.push([particleX, particleY, particle_path_fill]); //add to list of particles that are drawn

}

function start() { //when body is loaded
    setUpSliders();
    animate();
    setData(0);
}

function animate() { //animate function, called every frame
    a=requestAnimationFrame(animate);
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");

    //draw plates
    ctx.clearRect(0, 0, c.width, c.height);
    block(10, 100, blockWidth, 50, "#FF6B6B");
    block(10, 150 + (distance * 1000 * 5), blockWidth, 50, "#4ECDC4");

    //draw text
    ctx.font = "60px Arial";
    ctx.fillStyle = "#F7FFF7";
    ctx.fillText("-",  blockWidth/2, 140);
    ctx.fillText("+", blockWidth/2, 195 + (distance * 1000 * 5));
    addText();
    //draw arrows
    drawArrows();
    //apply physics
    if(doPhysics) {
        chargePhysics(100);
    }
    //draw the charge
    drawCharge(particleX, particleY);
    //draw the charge's path
    drawPath();
    //reset the canvas if the charge is out of bounds
    if(needReset()) {
        reset();
    }
}

//adds informational text on the screen
function addText() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.font = "15px Arial";
    var txt = "Not connected to a voltage source";
    var txt2 = "Voltage difference between plates is " + round(voltage) + " V";
    var txt3 = "Charge difference between plates is " + round(particle_charge) + "e-12 C";
    ctx.fillText(txt, 10, 25);
    ctx.fillText(txt2, 10, 45);
    ctx.fillText(txt3, 10, 65);
}

//draws electric field arrows
function drawArrows() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.strokeStyle = "#F7FFF7";

    //as the electric field increases, the arrows get closer
    //also, the arrows remain proportional to the distance between the plates

    var addition = ((electric_field / 300) * 400) * (distance / .06) / 2;
    var center = (150 +  150 + (distance * 1000 * 5)) / 2;
    var arrow_length = (distance * 1000 * 5) - 25;

    addition = 120 - (addition / 2);

    if(addition < 15) {
        addition = 15;
    }

    for(var i = 50; i < blockWidth; i+= addition) {

        if(arrow_length < 10) {
            arrow_length = 10;
        } else if(arrow_length > 200) {
            arrow_length = 200;
        }

        ctx.beginPath();
        canvas_arrow(ctx, i, center + arrow_length/2, i, center - arrow_length/2);
        ctx.stroke();
    }
}

//draws arrow
function canvas_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}

//draws the path of the particles
function drawPath() {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    for(var i = 0; i < particle_path.length; i++) {
        var x = particle_path[i][0];
        var y = particle_path[i][1];
        var fill = particle_path[i][2];
        ctx.fillStyle = fill;
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, 2 * Math.PI);
        ctx.fill();
    }
}

//draws the charge as a circle
function drawCharge(xPos, yPos) {
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	ctx.fillStyle = "#FFE66D";
	ctx.beginPath();
	ctx.arc(xPos, yPos, (particle_mass / 9.1) * 5, 0, 2 * Math.PI);
	ctx.fill();
}

//stop the animation
function stopAnimation() {
    cancelAnimationFrame(a);
}

//draws a rectangle on the screen
function block(xPos, yPos, width, height, color) {
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.rect(xPos, yPos, width, height);
	ctx.fill();
}

//when user clicks start particle
function begin() {
    doPhysics = true;
    canChange = false;
    disableAll(true);
}

//when user clicks stop particle
function stop() {
    doPhysics = false;
}

//resets the particle on the screen
function reset() {
    particle_path_fill = randomColor();
    canChange = true;
    disableAll(false);
    doPhysics = false;
    particleX = 10; //in px
    particleY = 250; //in px

    particle_velocityX = 3 * Math.pow(10, 6); //m / s
    particle_velocityY = 0;

    setData(0);
}

//resets everything, including saved paths and particle & plate properties
function resetAll() {
    reset();
    particle_path = [];
    blockWidth = 500;

    particleX = 10; //in px
    particleY = 250; //in px

    particle_velocityX = 3 * Math.pow(10, 6); //m / s
    particle_velocityY = 0;

    electric_field = 178; //N / C
    particle_mass = 9.1; //times 10^-31
    particle_charge = -1.6; //times 10^-19, charge is really negative but coordinate grid is upside down

    voltage = 8.9; //V
    capacitance = 1.77; //e-13 Farads
    area = 0.001; //m^2
    distance = 0.05; //m
    plate_charge = 1.58; //e-12 C

    width = 100; //mm

    velocityXslider.value = particle_velocityX;
    velocityYslider.value = particle_velocityY;
    fieldSlider.value = electric_field;
    massSlider.value = particle_mass;
    chargeSlider.value = particle_charge;
    voltageSlider.value = voltage;
    // capacitanceSlider.value = capacitance;
    areaSlider.value = area;
    distanceSlider.value = distance;
    plateChargeSlider.value = plate_charge;
    widthSlider.value = width;

    document.getElementById("particleMass").innerHTML = "Particle Mass: " + particle_mass	+ "e-31 kg";
    document.getElementById("particleCharge").innerHTML = "Particle Charge: " + particle_charge + "e-19 C";
    document.getElementById("particleVelocityX").innerHTML = "Particle Initial X Velocity: " + particle_velocityX + " m/s";
    document.getElementById("particleVelocityY").innerHTML = "Particle Initial Y Velocity: " + particle_velocityY + " m/s";
    document.getElementById("field").innerHTML = "Uniform Electric Field: " + electric_field	+ " N/C";
    document.getElementById("voltage").innerHTML = "Voltage: " + round(voltage)	+ " V";
    document.getElementById("platecharge").innerHTML = "Plate Charge: " + round(plate_charge)	+ "e-12 C";
    document.getElementById("capacitance").innerHTML = "Capacitance: " + round(capacitance)	+ "e-13 Farads";
    document.getElementById("area").innerHTML = "Area: " + area	+ " m^2";
    document.getElementById("distance").innerHTML = "Plate Distance: " + distance + " m";
    document.getElementById("width").innerHTML = "Width: " + width	+ " mm";
}

//checks if the particle has collided with the plates, or is out of bounds
function needReset() {

    let particle_left = particleX - 5;
    let particle_right = particleX + 5;
    let particle_top = particleY - 5;
    let particle_bottom = particleY + 5;

    let top_left = 10;
    let top_right = 10 + blockWidth;
    let top_top = 100;
    let top_bottom = 150;

    let bottom_left = 10;
    let bottom_right = 10 + blockWidth;
    let bottom_top = 150 + (distance * 1000 * 5);
    let bottom_bottom = 200 + (distance * 1000 * 5);

    if (particle_left >= top_right) {
        return true;
    } else if(particle_left <= bottom_right && particle_right >= bottom_left && particle_top <= bottom_bottom && particle_bottom >= bottom_top) {
        return true;
    } else if(particle_left <= top_right && particle_right >= top_left && particle_top <= top_bottom && particle_bottom >= top_top) {
        return true;
    }
    return false;


}

//slider code

let massSlider;
let chargeSlider;
let velocityXslider;
let velocityYslider;
let fieldSlider;
let voltageSlider;
// let capacitanceSlider;
let areaSlider;
let distanceSlider;
let plateChargeSlider;
let widthSlider;

//initializes the sliders
function setUpSliders() {
    massSlider = document.getElementById("massSlider");
    chargeSlider = document.getElementById("chargeSlider");
    velocityXslider = document.getElementById("velocityXSlider");
    velocityYslider = document.getElementById("velocityYSlider");
    fieldSlider = document.getElementById("fieldSlider");
    voltageSlider = document.getElementById("voltageSlider");
    // capacitanceSlider = document.getElementById("capacitanceSlider");
    areaSlider = document.getElementById("areaSlider");
    distanceSlider = document.getElementById("distanceSlider");
    plateChargeSlider = document.getElementById("platechargeSlider");
    widthSlider = document.getElementById("widthSlider");
}

//disables all the sliders so the user can't change them
function disableAll(isDisabled) {
    massSlider.disabled = isDisabled;
    chargeSlider.disabled = isDisabled;
    velocityXslider.disabled = isDisabled;
    velocityYslider.disabled = isDisabled;
    fieldSlider.disabled = isDisabled;
    voltageSlider.disabled = isDisabled;
    // capacitanceSlider.disabled = isDisabled;
    areaSlider.disabled = isDisabled;
    distanceSlider.disabled = isDisabled;
    plateChargeSlider.disabled = isDisabled;
    widthSlider.disabled = isDisabled;
}

//changes the variables based on the sliders

function changeMass() {
    if(canChange) {
        particle_mass = parseFloat(massSlider.value);
        document.getElementById("particleMass").innerHTML = "Particle Mass: " + particle_mass	+ "e-31 kg";
    }
}

function changeCharge() {
    if(canChange) {
        particle_charge = parseFloat(chargeSlider.value);
        document.getElementById("particleCharge").innerHTML = "Particle Charge: " + particle_charge + "e-19 C";
    }
}

function changeXVelocity() {
    if(canChange) {
        particle_velocityX = parseFloat(velocityXslider.value);
        document.getElementById("particleVelocityX").innerHTML = "Particle Initial X Velocity: " + particle_velocityX + " m/s";
        setData(0);
    }
}

function changeYVelocity() {
    if(canChange) {
        particle_velocityY = parseFloat(velocityYslider.value);
        document.getElementById("particleVelocityY").innerHTML = "Particle Initial Y Velocity: " + particle_velocityY + " m/s";
        setData(0);
    }
}

function changeField() {
    if(canChange) {
        electric_field = parseFloat(fieldSlider.value);
        voltage = electric_field * distance;
        document.getElementById("field").innerHTML = "Uniform Electric Field: " + electric_field	+ " N/C";
        document.getElementById("voltage").innerHTML = "Voltage: " + round(voltage)	+ " V";
        voltageSlider.value = voltage;
    }
}

function changeVoltage() {
    if(canChange) {
        voltage = parseFloat(voltageSlider.value);
        electric_field = voltage / distance;
        plate_charge = voltage * capacitance;
        document.getElementById("field").innerHTML = "Uniform Electric Field: " + round(electric_field)	+ " N/C";
        document.getElementById("voltage").innerHTML = "Voltage: " + round(voltage)	+ " V";
        document.getElementById("platecharge").innerHTML = "Plate Charge: " + round(plate_charge)	+ "e-12 C";
        fieldSlider.value = electric_field;
        plateChargeSlider.value = plate_charge;
    }
}

function changeCapacitance() {
    if(canChange) {
        capacitance = parseFloat(capacitanceSlider.value);
        voltage = plate_charge / capacitance * 10; //times 10 in order to deal with exponents
        electric_field = voltage / distance;
        document.getElementById("field").innerHTML = "Uniform Electric Field: " + round(electric_field)	+ " N/C";
        document.getElementById("voltage").innerHTML = "Voltage: " + round(voltage)	+ " V";
        document.getElementById("capacitance").innerHTML = "Capacitance: " + round(capacitance)	+ "e-13 Farads";
        voltageSlider.value = voltage;
        fieldSlider.value = electric_field;
    }
}

function changeArea() {
    if(canChange) {
        area = parseFloat(areaSlider.value);
        let epsilon_nought = 8.85;
        capacitance = (epsilon_nought * area) / distance; //e-12
        capacitance *= 10;
        voltage = plate_charge / capacitance * 10;
        electric_field = voltage / distance;
        document.getElementById("field").innerHTML = "Uniform Electric Field: " + round(electric_field)	+ " N/C";
        document.getElementById("voltage").innerHTML = "Voltage: " + round(voltage)	+ " V";
        document.getElementById("capacitance").innerHTML = "Capacitance: " + round(capacitance)	+ "e-13 Farads";
        document.getElementById("area").innerHTML = "Area: " + area	+ " m^2";
        voltageSlider.value = voltage;
        fieldSlider.value = electric_field;
        // capacitanceSlider.value = capacitance;
    }
}

function changeDistance() {
    if(canChange) {
        distance = parseFloat(distanceSlider.value);
        let epsilon_nought = 8.85;
        capacitance = (epsilon_nought * area) / distance; //e-12
        capacitance *= 10;
        voltage = plate_charge / capacitance * 10;
        electric_field = voltage / distance;
        document.getElementById("field").innerHTML = "Uniform Electric Field: " + round(electric_field) + " N/C";
        document.getElementById("voltage").innerHTML = "Voltage: " + round(voltage) + " V";
        document.getElementById("capacitance").innerHTML = "Capacitance: " + round(capacitance) + "e-13 Farads";
        document.getElementById("distance").innerHTML = "Plate Distance: " + distance + " m";
        voltageSlider.value = voltage;
        fieldSlider.value = electric_field;
        // capacitanceSlider.value = capacitance;
    }
}

function changePlateCharge() {
    if(canChange) {
        plate_charge = parseFloat(plateChargeSlider.value);
        voltage = plate_charge / capacitance * 10; //times 10 in order to deal with exponents
        electric_field = voltage / distance;
        document.getElementById("field").innerHTML = "Uniform Electric Field: " + round(electric_field)	+ " N/C";
        document.getElementById("voltage").innerHTML = "Voltage: " + round(voltage)	+ " V";
        document.getElementById("platecharge").innerHTML = "Plate Charge: " + round(plate_charge)	+ "e-12 C";
        voltageSlider.value = voltage;
        fieldSlider.value = electric_field;
    }
}

function changeWidth() {
    if(canChange) {
        width = parseFloat(widthSlider.value);
        blockWidth = width * 5;
        area = ((50 / 5) * width) / (1000000); //do mm * mm, then convert to m^2
        let epsilon_nought = 8.85;
        capacitance = (epsilon_nought * area) / distance; //e-12
        capacitance *= 10;
        voltage = plate_charge / capacitance * 10;
        electric_field = voltage / distance;
        document.getElementById("field").innerHTML = "Uniform Electric Field: " + round(electric_field)	+ " N/C";
        document.getElementById("voltage").innerHTML = "Voltage: " + round(voltage)	+ " V";
        document.getElementById("capacitance").innerHTML = "Capacitance: " + round(capacitance)	+ "e-13 Farads";
        document.getElementById("area").innerHTML = "Area: " + area	+ " m^2";
        document.getElementById("width").innerHTML = "Width: " + width	+ " mm";
        voltageSlider.value = voltage;
        fieldSlider.value = electric_field;
        // capacitanceSlider.value = capacitance;
        areaSlider.value = area;
    }
}

//sets the data on the screen: force, particle x & y velocity and position
function setData(force) {

    var direction = "";

    if(force < 0) {
        direction = " downwards";
    } else if(force > 0) {
        direction  = " upwards";
    }

    force = Math.abs(force);

    document.getElementById("data").innerHTML = "X Position: " + round(particleX/5) + " mm<br>"
        + "Y Position: " + (500 - round(particleY/5)) + " mm<br>" + "X Velocity: " +   round(particle_velocityX) + " m/s<br>"
        + "Y Velocity: " + round(particle_velocityY) + " m/s<br>" + "Net Force: " + force + " N" + direction;
}



