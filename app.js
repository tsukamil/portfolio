import Game from '/js/game.js';

new fullpage('#fullpage', {
    autoScrolling: true,
    navigation: true,
    keyboardScrolling: false,
    onLeave: (origin, destination, direction) => {
        const section = destination.item;
        const title = section.querySelector('.title');
        const subtitle = section.querySelector('.subtitle');
        const tl = new TimelineMax({delay: 0.5});
        tl.fromTo(title, 0.5, {y: '50', opacity: 0}, {y:0, opacity: 1})
        .fromTo(subtitle, 0.5, {y: '50', opacity: 0}, {y:0, opacity: .2})
    }
}) 

document.addEventListener("DOMContentLoaded", function(event){
    document.getElementsByTagName("body")[0].style.display = "block";
  });

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);
game.start();

let lastTime = 0;

function gameLoop(timestamp) {

    let deltaTime = timestamp - lastTime; 
    lastTime = timestamp;
    
    ctx.clearRect(0,0,GAME_WIDTH, GAME_HEIGHT); 
    
    game.update(deltaTime);
    game.draw(ctx); 



    requestAnimationFrame(gameLoop);

} 

requestAnimationFrame(gameLoop); 