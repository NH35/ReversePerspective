//REVERSE PERSPECTIVE CANVAS JS
//by Hippolyte ROUSSEL (NH35)
//06/11/2021


const canvas = document.querySelector("canvas"); //selectionne la canvas dans la page html
canvas.width = window.innerWidth; //redefinit la tailel de la canvas
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");
const center = { x: canvas.width / 2, y: canvas.height / 2, z: 0 }




// element that appear on the canvas and seem to rotate
class Rectangle {
    constructor(centerPosXY, dimensions, color) {
        this.pos = centerPosXY; //positon of the center of the rectangle
        this.dimensions = dimensions; //relative dimension of the rectangle in the canvas
        this.originalDimensions = {...dimensions }; //absolute dimension when initialised
        this.ratio = dimensions.height / dimensions.width; // when the width is modified, the height stay proportional
        this.color = color; //just the color of the rectangle
        this.angleAroundCircle = 0; // indicate the the radian position around the circle
    }

    draw() { //draw on the canvas, based on the center of the rectangle (not the corner)
        c.fillStyle = this.color;
        c.fillRect(this.pos.x - this.dimensions.width / 2, this.pos.y - this.dimensions.height / 2, this.dimensions.width, this.dimensions.height);
    }
}

//a flat circle where rectangle turn around
class Circle {
    constructor(nbRectangle, elementDimensions, radius, rotationSpeed, centerPosXY, reversePerspective, turnLeft) {
        this.rectangles = []; //an array of all the rectangles
        this.nbRectangle = nbRectangle; // number of rectangle around the circle
        this.elementDimensions = elementDimensions;
        for (let i = 0; i < nbRectangle; i++) { //create the number of rectangle desired, the color is generated with a given function (see at the bottom of the page)
            this.rectangles.push(new Rectangle({ x: center.x, y: center.y }, {...elementDimensions }, getRandomColor()))

            this.rectangles[i].angleAroundCircle = ((2 * Math.PI) / this.nbRectangle) * i; // give the position around the circle to the rectangle
        }

        //some properties of the circle
        this.radius = radius;
        this.rotationSpeed = rotationSpeed;
        this.turnLeft = turnLeft;
        this.pos = centerPosXY; //position of the center of the circle in the canvas
        this.reversePerspective = reversePerspective; // if you want to see a reverse perspective or not. (that was the original goal of this code)
    }

    updatePos() {
        for (let i = 0; i < this.nbRectangle; i++) {
            if (this.turnLeft) {
                this.rectangles[i].angleAroundCircle -= this.rotationSpeed;

                if (this.rectangles[i].angleAroundCircle < 0 * Math.PI) { // reduce the angle between 0 and 2 
                    this.rectangles[i].angleAroundCircle += 2 * Math.PI;
                }
            } else {
                this.rectangles[i].angleAroundCircle += this.rotationSpeed;

                if (this.rectangles[i].angleAroundCircle > 2 * Math.PI) { // reduce the angle between 0 and 2 
                    this.rectangles[i].angleAroundCircle -= 2 * Math.PI;
                }
            }


            let posX = this.pos.x + Math.cos(this.rectangles[i].angleAroundCircle) * this.radius;
            this.rectangles[i].pos.x = posX;
            this.rectangles[i].pos.y = this.pos.y; //only use if you outcenter the circle
        }
    }

    updateSize() {
        for (let i = 0; i < this.nbRectangle; i++) {
            this.rectangles[i].dimensions.width = this.rectangles[i].originalDimensions.width + Math.sin(this.rectangles[i].angleAroundCircle) * 30; //30 is arbitrary. Cause bug if this.elementDimensions.width is inferior
            this.rectangles[i].dimensions.height = this.rectangles[i].dimensions.width * this.rectangles[i].ratio;
        }
    }

    drawAll() {
        let targetAngle;
        if (this.reversePerspective) {
            targetAngle = 0.5 * Math.PI;
        } else {
            targetAngle = 1.5 * Math.PI;
        }

        //sort to draw the behind rectangles first and the ahead rectangles after. the bahind ones are the one with a angle close to 1.5*PI
        this.rectangles.sort((a, b) => (Math.abs(a.angleAroundCircle - targetAngle) > Math.abs(b.angleAroundCircle - targetAngle)) ? 1 : -1);

        for (let i = 0; i < this.nbRectangle; i++) {
            this.rectangles[i].draw();
        }

    }
}







/////////////////////// SETUP /////////////////////////

let circles = [];

circles.push(new Circle(5, { width: 50, height: 100 }, 300, 0.02, { x: center.x - 300, y: center.y - 200 }, false, false)); //circle param : nbRectangles , dimensions of rectangles, radius of circle, rotation speed, position of circle, reverse persepctive, turn left instead of right
circles.push(new Circle(5, { width: 50, height: 100 }, 300, 0.02, { x: center.x + 300, y: center.y + 200 }, true, true));

circles.sort((a, b) => (Math.abs(a.radius) > Math.abs(b.radius)) ? 1 : -1); //sort for particular case



/////////////////////// LOOP /////////////////////////

function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height); // raffraichisment de la canvas
    circles.forEach(circle => {
        circle.updatePos();
        circle.updateSize();
        circle.drawAll();
    });
    requestAnimationFrame(animate);
}
animate();




/////////////////////// LIBRAIRIES /////////////////////////


function getRandomColor() { //https://stackoverflow.com/questions/1484506/random-color-generator //suprinsingly the color palet is always pretty
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}