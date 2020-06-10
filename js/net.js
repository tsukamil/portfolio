export default class Net {
    
    constructor(game) {

        this.gameWidth = game.gameWidth;
        
        this.width = 4;
        this.height = 55;
        
        this.position = {
            x: game.gameWidth/2 - this.width / 2,
            y: game.gameHeight - this.height
        };

        this.bottomGame = game.gameHeight;

    }

    draw(ctx) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
    }

    update(deltaTime) {
        
    }
}