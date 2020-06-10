import InputHandler from "/js/input.js";
import Player from "/js/player.js";
import Ball from '/js/ball.js';
import Net from '/js/net.js';
import Opponent from '/js/opponent.js';

export default class Game {
    
    constructor(gameWidth, gameHeight) {
        
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        
    }

    start() {

        this.net = new Net(this);
        this.player = new Player(this);
        this.ball = new Ball(this);
        this.opponent = new Opponent(this);

       

        this.gameObjects = [this.net, this.player, this.ball, this.opponent];

        new InputHandler(this.player);

    }

    update(deltaTime) {

        this.gameObjects.forEach((object) => object.update(deltaTime));
        
    }


    draw(ctx) {
        this.gameObjects.forEach((object) => object.draw(ctx));
    }
}