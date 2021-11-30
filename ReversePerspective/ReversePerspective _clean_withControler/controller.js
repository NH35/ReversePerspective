/////////////////////// Controller /////////////////////////

//// Circle 1 /////

document.getElementById("c1_slider-radius").oninput = function() {
    circles[1].radius = this.value;
}
document.getElementById("c1_slider-rotation-speed").oninput = function() {
    circles[1].rotationSpeed = this.value / 10000;
}

document.getElementById("c1_slider-position-y").oninput = function() {
    circles[1].pos.y = canvas.height * this.value / 1000;
}

document.getElementById("c1_slider-position-x").oninput = function() {
    circles[1].pos.x = canvas.width * this.value / 1000;
}

document.getElementById("c1_slider-factor").oninput = function() {
    circles[1].perspectiveFactor = this.value;
}

document.getElementById("c1_slider-nbRectangle").oninput = function() {

    if (circles[1].nbRectangle < this.value) {
        let missingRect = this.value - circles[1].nbRectangle;
        circles[1].nbRectangle += missingRect;
        for (let i = 0; i < missingRect; i++) {
            circles[1].rectangles.push(new Rectangle({ x: center.x, y: center.y }, {...circles[1].elementDimensions }, getRandomColor()));
        }

        for (let i = 0; i < circles[1].nbRectangle; i++) { //create the number of rectangle desired, the color is generated with a given function (see at the bottom of the page)
            circles[1].rectangles[i].angleAroundCircle = ((2 * Math.PI) / circles[1].nbRectangle) * i; // give the position around the circle to the rectangle
        }

    } else if (circles[1].nbRectangle > this.value) {
        let toMuchRect = circles[1].nbRectangle - this.value;
        circles[1].nbRectangle -= toMuchRect;
        for (let i = 0; i < toMuchRect; i++) {
            circles[1].rectangles.pop();
        }

        for (let i = 0; i < circles[1].nbRectangle; i++) { //create the number of rectangle desired, the color is generated with a given function (see at the bottom of the page)
            circles[1].rectangles[i].angleAroundCircle = ((2 * Math.PI) / circles[1].nbRectangle) * i; // give the position around the circle to the rectangle
        }

    }
}
document.getElementById("c1_slider-rect-width").oninput = function() {
    circles[1].elementDimensions.width = this.value;
    for (let i = 0; i < circles[1].nbRectangle; i++) {
        circles[1].rectangles[i].originalDimensions.width = this.value;
        circles[1].rectangles[i].ratio = circles[1].rectangles[i].originalDimensions.height / circles[1].rectangles[i].originalDimensions.width;
    }
}

document.getElementById("c1_slider-rect-height").oninput = function() {
    circles[1].elementDimensions.height = this.value;
    for (let i = 0; i < circles[1].nbRectangle; i++) {
        circles[1].rectangles[i].originalDimensions.height = this.value;
        circles[1].rectangles[i].ratio = circles[1].rectangles[i].originalDimensions.height / circles[1].rectangles[i].originalDimensions.width;
    }
}

function c1_btn_change_direction() {
    if (circles[1].turnLeft) {
        circles[1].turnLeft = false;
    } else {
        circles[1].turnLeft = true;
    }
}

function c1_btn_change_perspective() {
    if (circles[1].reversePerspective) {
        circles[1].reversePerspective = false;
    } else {
        circles[1].reversePerspective = true;
    }
}



//// Circle 1 /////

document.getElementById("c2_slider-radius").oninput = function() {
    circles[0].radius = this.value;
}
document.getElementById("c2_slider-rotation-speed").oninput = function() {
    circles[0].rotationSpeed = this.value / 10000;
}

document.getElementById("c2_slider-position-y").oninput = function() {
    circles[0].pos.y = canvas.height * this.value / 1000;
}

document.getElementById("c2_slider-position-x").oninput = function() {
    circles[0].pos.x = canvas.width * this.value / 1000;
}

document.getElementById("c2_slider-factor").oninput = function() {
    circles[0].perspectiveFactor = this.value;
}

document.getElementById("c2_slider-nbRectangle").oninput = function() {

    if (circles[0].nbRectangle < this.value) {
        let missingRect = this.value - circles[0].nbRectangle;
        circles[0].nbRectangle += missingRect;
        for (let i = 0; i < missingRect; i++) {
            circles[0].rectangles.push(new Rectangle({ x: center.x, y: center.y }, {...circles[0].elementDimensions }, getRandomColor()));
        }

        for (let i = 0; i < circles[0].nbRectangle; i++) { //create the number of rectangle desired, the color is generated with a given function (see at the bottom of the page)
            circles[0].rectangles[i].angleAroundCircle = ((2 * Math.PI) / circles[0].nbRectangle) * i; // give the position around the circle to the rectangle
        }

    } else if (circles[0].nbRectangle > this.value) {
        let toMuchRect = circles[0].nbRectangle - this.value;
        circles[0].nbRectangle -= toMuchRect;
        for (let i = 0; i < toMuchRect; i++) {
            circles[0].rectangles.pop();
        }

        for (let i = 0; i < circles[0].nbRectangle; i++) { //create the number of rectangle desired, the color is generated with a given function (see at the bottom of the page)
            circles[0].rectangles[i].angleAroundCircle = ((2 * Math.PI) / circles[0].nbRectangle) * i; // give the position around the circle to the rectangle
        }

    }
}
document.getElementById("c2_slider-rect-width").oninput = function() {
    circles[0].elementDimensions.width = this.value;
    for (let i = 0; i < circles[0].nbRectangle; i++) {
        circles[0].rectangles[i].originalDimensions.width = this.value;
        circles[0].rectangles[i].ratio = circles[1].rectangles[i].originalDimensions.height / circles[0].rectangles[i].originalDimensions.width;
    }
}

document.getElementById("c2_slider-rect-height").oninput = function() {
    circles[0].elementDimensions.height = this.value;
    for (let i = 0; i < circles[0].nbRectangle; i++) {
        circles[0].rectangles[i].originalDimensions.height = this.value;
        circles[0].rectangles[i].ratio = circles[0].rectangles[i].originalDimensions.height / circles[0].rectangles[i].originalDimensions.width;
    }
}

function c2_btn_change_direction() {
    if (circles[0].turnLeft) {
        circles[0].turnLeft = false;
    } else {
        circles[0].turnLeft = true;
    }
}

function c2_btn_change_perspective() {
    if (circles[0].reversePerspective) {
        circles[0].reversePerspective = false;
    } else {
        circles[0].reversePerspective = true;
    }
}