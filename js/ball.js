export default class Ball {
    constructor(game) { 

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.game = game;

        this.position = { x: 50, y: 50 };
        this.speed = { x: 0, y: 1 };
        this.radius = 15;
        this.gravity = 0.05;
    }

    collideWithObject(top, bottom, left, right, offset) {
        let bottomOfBall = this.position.y + this.radius;

        if (
            bottomOfBall >= top &&
            bottomOfBall < bottom && 
            this.position.x >= left + offset && 
            this.position.x <= right - offset
        ) {
            this.speed.y = -2;
        }

        if (
            bottomOfBall >= top &&
            bottomOfBall < bottom && 
            this.position.x > right - offset && 
            this.position.x < right
        ) {
            this.speed.y = -2;
            this.speed.x = 2;
        }

        if (
            bottomOfBall >= top &&
            bottomOfBall < bottom && 
            this.position.x > left && 
            this.position.x < left + offset
        ) {
            this.speed.y = -2;
            this.speed.x = -2;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#fff'; 
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 1, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#f00'; 
        ctx.fill();      
    }

    update(deltaTime) {

        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        if (this.speed.y < 3) {
            this.speed.y += this.gravity;
        }

        let bottomOfBall = this.position.y + this.radius;

        // wall left right
        if (this.position.x > this.gameWidth-this.radius && this.speed.x>0) {
            this.speed.x = -this.speed.x;
        }
        if (this.position.x - this.radius < 0 && this.speed.x<0) {
            this.speed.x = -this.speed.x;
        }

        //wall top bottom
        if (this.position.y > this.gameHeight-this.radius) {
            this.speed.y = -this.speed.y;
        }

        if (this.position.y - this.radius < 0 && this.speed.y<0) {
            this.speed.y = -this.speed.y;
        }

        //collision with net
        let topOfNet = this.game.net.position.y;
        let leftSideOfNet = this.game.net.position.x;
        let rightSideOfNet = this.game.net.position.x+this.game.net.width;

        if (bottomOfBall >= topOfNet
            && this.position.x > leftSideOfNet
            && this.position.x < rightSideOfNet) this.speed.y = -2;

        if (this.position.x + this.radius == leftSideOfNet - 1 
            && this.speed.x > 0
            && this.position.y + this.radius/2 >= topOfNet) this.speed.x *= -1;

        if (this.position.x - this.radius == rightSideOfNet + 1 
            && this.speed.x < 0
            && this.position.y + this.radius/2 >= topOfNet) this.speed.x *= -1;

        //collision with player
        let topOfPlayer = this.game.player.position.y - this.game.player.radius;
        let bottomOfPlayer = this.game.player.position.y + this.game.player.radius;
        let leftSideOfPlayer = this.game.player.position.x - this.game.player.radius;
        let rightSideOfPlayer = this.game.player.position.x + this.game.player.radius;
        let offsetPlayer = this.game.player.radius/2;

        this.collideWithObject(topOfPlayer, bottomOfPlayer, leftSideOfPlayer, rightSideOfPlayer, offsetPlayer);

        //collision with opponent
        let topOfOpponent = this.game.opponent.position.y - this.game.opponent.radius;
        let bottomOfOpponent = this.game.opponent.position.y + this.game.opponent.radius;
        let leftSideOfOpponent = this.game.opponent.position.x - this.game.opponent.radius;
        let rightSideOfOpponent = this.game.opponent.position.x + this.game.opponent.radius;
        let offsetOpponent = this.game.opponent.radius/2;

        this.collideWithObject(topOfOpponent, bottomOfOpponent, leftSideOfOpponent, rightSideOfOpponent, offsetOpponent);
       




    }
}