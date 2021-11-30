const canvas = document.querySelector("canvas"); //selectionne la canvas dans la page html
canvas.width = window.innerWidth; //redefinit la tailel de la canvas
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

const center = { x: canvas.width / 2, y: canvas.height / 2, z: 0 }

class Rect {
    constructor(centerPosXY, dimensions, color) {
        this.pos = centerPosXY;
        this.originalPos = {...centerPosXY }; //la cause de tout les bugs ! il faut dupliquer l'objet sinon c'est jsute un pointeur sur le meme truc.
        this.dimensions = dimensions;
        this.originalDimensions = {...dimensions };
        this.ratio = dimensions.height / dimensions.width;
        this.color = color;
        this.angleAroundCircle;
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.pos.x - this.dimensions.width / 2, this.pos.y - this.dimensions.height / 2, this.dimensions.width, this.dimensions.height);
    }

    ratioHeight() {
        this.dimensions.height = this.dimensions.width * this.ratio;
    }

}

class Circle {
    constructor(nbElements, elementDimensions, radius, speed, centerPosXY, reversePerspective) {
        this.elements = [];
        this.nbElements = nbElements;

        
        for (let i = 0; i < nbElements; i++) {
            this.elements.push(new Rect({ x: center.x, y: center.y }, {...elementDimensions }, getRandomColor()))


        }

        //this.elements.push(new Rect({ x: center.x, y: center.y }, { width: 50, height: 100 }, "orange"))
        //this.elements.push(new Rect({ x: center.x, y: center.y }, { width: 50, height: 100 }, "red"))
        //this.elements.push(new Rect({ x: center.x, y: center.y }, { width: 50, height: 100 }, "green"))
        //this.elements.push(new Rect({ x: center.x, y: center.y }, { width: 50, height: 100 }, "blue"))
        //this.elements.push(new Rect({ x: center.x, y: center.y }, { width: 50, height: 100 }, "purple"))
        //this.nbElements = this.elements.length;


        this.radius = radius;
        this.speed = speed;
        this.pos = centerPosXY;
        this.reversePerspective = reversePerspective;


    }

    positionAround() {
        let angles = (2 * Math.PI) / this.nbElements;

        for (let i = 0; i < this.nbElements; i++) {
            this.elements[i].angleAroundCircle = angles * i;
            if (this.elements[i].angleAroundCircle > 2 * Math.PI) {
                this.elements[i].angleAroundCircle -= 2 * Math.PI;
            }

            this.elements[i].posZ = Math.cos(this.elements[i].angleAroundCircle) * this.radius;

            let posX = Math.cos(this.elements[i].angleAroundCircle) * this.radius;
            this.elements[i].pos.x += posX;
        }
    }


    updatePos() {
        for (let i = 0; i < this.nbElements; i++) {
            this.elements[i].angleAroundCircle += this.speed;
            if (this.elements[i].angleAroundCircle > 2 * Math.PI) {
                this.elements[i].angleAroundCircle -= 2 * Math.PI;
            }
            let posX = this.pos.x + Math.cos(this.elements[i].angleAroundCircle) * this.radius;
            this.elements[i].pos.x = posX;
        }
    }
    updateSize() {
        for (let i = 0; i < this.nbElements; i++) {
            this.elements[i].dimensions.width = this.elements[i].originalDimensions.width + Math.sin(this.elements[i].angleAroundCircle) * 30;

            this.elements[i].ratioHeight();
        }
    }

    drawAll() {
        let targetAngle;
        if (this.reversePerspective) {
            targetAngle = 0.5 * Math.PI;
        } else {
            targetAngle = 1.5 * Math.PI;
        }

        this.elements.sort((a, b) => (Math.abs(a.angleAroundCircle - targetAngle) > Math.abs(b.angleAroundCircle - targetAngle)) ? 1 : -1);

        for (let i = 0; i < this.nbElements; i++) {
            this.elements[i].draw();
        }

    }

}


let circle = new Circle(6, { width: 50, height: 100 }, 300, 0.02, { x: center.x, y: center.y }, true);
let circle2 = new Circle(10, { width: 10, height: 70 }, 200, 0.02, { x: center.x + 600, y: center.y }, false);


circle.positionAround();
circle.drawAll();
circle2.positionAround();
circle2.drawAll();

function animate() {

    c.clearRect(0, 0, canvas.width, canvas.height); // raffraichisment de la canvas
    circle.updatePos();
    circle.updateSize();
    circle.drawAll();
    circle2.updatePos();
    circle2.updateSize();
    circle2.drawAll();

    setTimeout(function() {
        requestAnimationFrame(animate);
    }, 0100);
}
animate();


if (false) {
    setTimeout(function() {
        location.reload();
    }, 5000);
}





function getRandomColor() { //https://stackoverflow.com/questions/1484506/random-color-generator //suprinsingly the color palet is always pretty
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}