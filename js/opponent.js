export default class Opponent {
    
    constructor(game) {

        this.gameWidth = game.gameWidth;

        this.maxSpeed = 1.5;
        this.speed ={x: 0, y: 0};
        this.radius = 20;

        this.jumping = false;
        this.gravity = 0;

        this.game = game;
        
        this.position = {
            x: (game.gameWidth/4) * 3 + this.radius / 2,
            y: game.gameHeight - this.radius
        };

        this.bottomGame = game.gameHeight - this.radius;

    }

    moveLeft() {
        this.speed.x = -this.maxSpeed;
    }

    moveRight() {
        this.speed.x = +this.maxSpeed;
    }

    jump() {
        if (this.jumping==false) {
            this.jumping=true;
            this.speed.y=3;
            this.gravity = 0.1;
        }
    }

    stop() {
        this.speed.x = 0;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#bbb'; 
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 1, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#f00'; 
        ctx.fill();  
    }

    update(deltaTime) {
        
        this.position.x += this.speed.x;

        if (this.position.x>this.gameWidth-this.radius) this.position.x=this.gameWidth-this.radius;
        if (this.position.x<this.game.net.position.x+this.game.net.width+this.radius) this.position.x=this.game.net.position.x+this.game.net.width+this.radius;

        if ( this.game.ball.position.x > this.game.gameWidth/2) {
            if (this.game.ball.position.x+15 < this.position.x) this.moveLeft();
            if (this.game.ball.position.x+15 > this.position.x)  this.moveRight();
        } else this.stop();

        if (this.jumping) {
            if (this.speed.y>0) {
                this.speed.y -= this.gravity;
                this.position.y -= this.speed.y;
            } else if (this.position.y < this.bottomGame) {
                if (this.gravity<1.5) this.gravity+=this.gravity;
                this.position.y += this.gravity;
            } else {
                this.jumping = false;
            }
        }
    }
}