/// <reference path="ground.ts" />


class Game {
    
    public ground: Ground;
    private character: Character;
    public bg1: Background;
    public bg2: Background;
    private fuel: Fuel;

    public wings: Array<Wing> = new Array<Wing>();
    public choppers: Array<Chopper> = new Array<Chopper>();
    public shields: Array<Shield> = new Array<Shield>();

    private static instance: Game;
    private timer;
    
    constructor() {
        this.character = new Character();
        this.bg1 = new Background(this.character);
        this.ground = new Ground();
        this.fuel = new Fuel();
        
        this.timer = setInterval(() => this.spawnPowerUp(), 2000);
 
        requestAnimationFrame(() => this.gameLoop());
    };

    private gameLoop(){
        this.character.move();
        requestAnimationFrame(() => this.gameLoop());

        for ( let c of this.choppers ) {
            c.move();
        }

        for ( let w of this.wings ) {
            w.move();
        }

        for ( let s of this.shields ) {
            s.move();
        }

        this.fuel.div.style.width = this.character.fuel * 49.5 + "px";
    };
    
    public static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    
    public gameOver(){
        // console.log("game over");
    };

    private spawnPowerUp(){
        let powerUpChoice = Math.floor((Math.random() * 3) + 1);

        switch(powerUpChoice){
            case 1:
                console.log("new Wing");
                this.wings.push(new Wing(this.character));
                break;
            case 2:
                console.log("new Shield");
                this.shields.push(new Shield(this.character));
                break;
            case 3:
                console.log("new Chopper");
                this.choppers.push(new Chopper(this.character));
                break;
        }
    }
   
}; 


// load
window.addEventListener("load", function() {
    let g = Game.getInstance();
});