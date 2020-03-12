function calculate() {
  let angle = document.getElementById("angle").value * 1;
  let mag = document.getElementById("mag").value * 1;
  let d1 = document.getElementById("d1").value;
  let d2 = document.getElementById("d2").value;

  d1 = d1.toUpperCase();
  d2 = d2.toUpperCase();


  let x = 1;
  let y = 1;


  if(d1 == "S") {
    if(d2 == "E") {
      y *= -1;
    } else if(d2 == "W") {
      x *= -1;
      y *= -1;
    }
  } else if(d1 == "N") {
    if(d2 == "E") {
      //nothing happens
    } else if(d2 == "W") {
      x *= -1;
    }
  } else if(d1 == "E") {
    if(d2 == "S") {
      y *= -1;
      angle = 90 - angle;
    } else if(d2 == "N") {
      engle = 90 - angle;
    }
  } else if(d1 == "W") {
    if(d2 == "S") {
      x *= -1;
      y *= -1;
      angle = 90 - angle;
    } else if(d2 == "N") {
      x *= -1;
      angle = 90 - angle;
    }
  }

    angle = angle * (Math.PI/180);

    x *= Math.cos(angle) * mag;
    y *= Math.sin(angle) * mag;

    document.getElementById("val").innerHTML = "(" + round(x) + "," + round(y) + ")";

}



function round(val) {
  val *= 100;
  val = Math.round(val);
  return val /= 100;
}
