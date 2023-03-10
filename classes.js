// Robot class //

class Robot {
    constructor (x, y, width, height, ctx ){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = 'images/robot.png';
    this.ctx = ctx;
}
    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    moveLeft() {
        this.x -= 10;
    }
    moveRight() {
        this.x += 10;
    }

    moveUp(){
        this.y -=10
    }

    moveDown() {
        this.y +=10
    }
}

class Zombies {
    constructor (x, y, width ctx ){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = 'images/zombie.png';
        this.ctx = ctx;
}

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    moveLeft() {
        this.x -= 10;
    }

}

class Humans {
    constructor (x, y, width, height, ctx ){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = 'images/human.png';
        this.ctx = ctx;
}

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    moveUp() {
        this.y -= 5;
    }
}
