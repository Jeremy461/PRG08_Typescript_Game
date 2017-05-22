/// <reference path="ground.ts" />


class Game {
    
    public ground: Ground;
    public catapult: Catapult;
    private character: Character;
    public background: Background;
    
    private static instance: Game;
    
    constructor() {
        this.character = new Character();
        this.background = new Background(this.character);
        this.ground = new Ground();
        this.catapult = new Catapult(this.character);
        
        requestAnimationFrame(() => this.gameLoop());
    };

    private gameLoop(){
        this.character.move();
        requestAnimationFrame(() => this.gameLoop());
    };
    
    public static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    
    public gameOver(){
        console.log("game over");
    };
   
}; 


// load
window.addEventListener("load", function() {
    let g = Game.getInstance();
});