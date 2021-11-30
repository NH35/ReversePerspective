const canvas = document.querySelector("canvas"); //selectionne la canvas dans la page html
canvas.width = window.innerWidth; //redefinit la tailel de la canvas
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

const center = { x: canvas.width / 2, y: canvas.height / 2, z: 0 }

class Rect {
    constructor(centerPosXY, dimensions, color) {
        this.pos = centerPosXY;
        this.originalPos = centerPosXY;
        this.dimensions = dimensions;
        this.originalDimensions = dimensions;
        this.ratio = dimensions.height / dimensions.width;
        this.color = color;
        this.posZ
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.pos.x - this.dimensions.width / 2, this.pos.y - this.dimensions.height / 2, this.dimensions.width, this.dimensions.height);
    }

    ratioHeight() {
        this.dimensions.height = this.dimensions.width * this.ratio;
    }

    updatePos(posX) {
        this.pos.x += posX;
    }
}

class Circle {
    constructor(nbElements, radius, speed, centerPosXY) {
        this.elements = [];

        this.elements.push(new Rect({ x: center.x, y: center.y }, { width: 50, height: 100 }, "orange"))
        this.elements.push(new Rect({ x: center.x, y: center.y }, { width: 50, height: 100 }, "red"))
        this.elements.push(new Rect({ x: center.x, y: center.y }, { width: 50, height: 100 }, "green"))
        this.elements.push(new Rect({ x: center.x, y: center.y }, { width: 50, height: 100 }, "blue"))
        this.elements.push(new Rect({ x: center.x, y: center.y }, { width: 50, height: 100 }, "purple"))
            //for (let i = 0; i < nbElements; i++) {
            //    this.elements.push(new Rect({ x: center.x, y: center.y }, { width: 50, height: 100 }, "purple"))
            //}
        this.nbElements = this.elements.length;
        this.radius = radius;
        this.speed = speed;
        this.pos = centerPosXY;
        this.angleAroundCircle = [];
    }

    positionAround() {
        let angles = (2 * Math.PI) / this.nbElements;

        for (let i = 0; i < this.nbElements; i++) {
            this.angleAroundCircle[i] = angles * i;

            this.elements[i].posZ = Math.cos(this.angleAroundCircle[i]) * this.radius;

            let posX = Math.cos(this.angleAroundCircle[i]) * this.radius;
            this.elements[i].updatePos(posX);

            let posY = Math.sin(this.angleAroundCircle[i]) * this.radius;
            this.elements[i].pos.y += posY;
        }
    }

    updatePos() {
        for (let i = 0; i < this.nbElements; i++) {
            this.angleAroundCircle[i] += 0.1;

            let posX = this.pos.x + Math.cos(this.angleAroundCircle[i]) * this.radius;
            this.elements[i].pos.x = posX;

            let posY = this.pos.y + Math.sin(this.angleAroundCircle[i]) * this.radius;
            this.elements[i].pos.y = posY;
        }
    }

    drawAll() {
        for (let i = 0; i < this.nbElements; i++) {
            this.elements[i].draw();
        }
    }

}


//let rect = new Rect({ x: center.x, y: center.y }, { width: 50, height: 100 });

let circle = new Circle(5, 200, 5, { x: center.x, y: center.y });


circle.positionAround();
//circle.sizeAround();
//circle.updatePos();
circle.drawAll();

function animate() {

    c.clearRect(0, 0, canvas.width, canvas.height); // raffraichisment de la canvas
    circle.updatePos();
    //circle.updateSize();
    circle.drawAll()

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