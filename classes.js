// Robot class //

class Robot {
    constructor (x, y, width, height, ctx ){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = 'images/robot draw.png';
    this.ctx = ctx;

}
    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    moveLeft() {
        this.x -= 15;
    }
    moveRight() {
        this.x += 15;
    }

    moveUp(){
        this.y -=15
    }

    moveDown() {
        this.y +=15
    }
}

function callTime(){
    imagesMoving = setTimeout(change(),20)}


function change(){
    cont++;
    if(cont >4){cont=0 }
}

class Zombies {
    constructor (x, y, ctx ){
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 60;
        this.image = new Image();
        this.image.src = 'images/zombie.png'
        this.ctx = ctx;
}

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    moveLeft() {
        this.x -=5;
    }

}

class Humans {
    constructor (x, y,ctx ){
        this.x = x;
        this.y = y;
        this.width = 25;
        this.height = 40;
        this.image = new Image();
        this.image.src = 'images/human.png';
        this.ctx = ctx;
}

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    moveUp() {
        this.y -= 4;
    }
}
