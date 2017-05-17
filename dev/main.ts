/// <reference path="ground.ts" />


class Game {
    
    private ground: Ground;
    private catapult: Catapult;
    private character: Character;
    
    constructor() {
        this.ground = new Ground();
        this.character = new Character();
        this.catapult = new Catapult(this, this.character);
        
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop(){
        this.character.move();
        requestAnimationFrame(() => this.gameLoop());
    }
} 


// load
window.addEventListener("load", function() {
    new Game();
});