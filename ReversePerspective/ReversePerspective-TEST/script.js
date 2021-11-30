const canvas = document.querySelector("canvas"); //selectionne la canvas dans la page html
canvas.width = window.innerWidth; //redefinit la tailel de la canvas
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

const center = { x: canvas.width / 2, y: canvas.height / 2 }

let radius = 10;

class Rect {
    constructor(centerPosX, centerPosY, width, height) {
        this.width = width;
        this.height = height;
        this.pos = { x: centerPosX - this.width / 2, y: centerPosY - this.height / 2 }

        this.angle = 0;
        this.ratio = (this.height / this.width);
    }

    draw() {
        c.fillStyle = "purple";
        c.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }

    update() {
        this.pos.x += Math.cos(this.angle * Math.PI) * radius;
        //this.pos.y += -Math.sin(this.angle * Math.PI) * radius;
        if (this.angle <= 1) {
            this.width = this.width + Math.sin(this.angle * Math.PI);
        } else {
            this.width = this.width + Math.sin(this.angle * Math.PI);
        }

        this.height = this.ratio * this.width;
        this.pos.y -= this.pos.y - center.y;
    }
}

let rect = new Rect(center.x, center.y, 50, 200);


class Circle {
    constructor(posX, posY, radius) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;

        this.minWidth = this.posX - radius;
        this.maxWidth = this.posX + radius;

        this.minHeight = this.posY - radius;
        this.maxHeight = this.posY + radius;

    }
}




function animate() {
    setTimeout(function() {
        requestAnimationFrame(animate);
    }, 0000);

    rect.angle += 0.005
    if (rect.angle >= 2) {
        rect.angle = 0;
    }

    rect.update();
    c.clearRect(0, 0, canvas.width, canvas.height); // raffraichisment de la canvas
    rect.draw();


}
animate();


/*
setTimeout(function() {
    location.reload();
}, 10000);*/