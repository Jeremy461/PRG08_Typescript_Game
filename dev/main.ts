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
    private loop;
    
    constructor() {
        this.character = new Character();
        this.bg1 = new Background(this.character);
        this.ground = new Ground();
        this.fuel = new Fuel();
        
        this.timer = setInterval(() => this.spawnPowerUp(), 2000);
 
        this.loop = requestAnimationFrame(() => this.gameLoop());
    };

    private gameLoop(){
        this.character.move();
        requestAnimationFrame(() => this.gameLoop());
        this.fuel.div.style.width = this.character.fuel * 49.5 + "px";
                
        if(this.character.x >= 400 && !Utils.checkCollision(this.character, this.ground)){
            this.bg1.move();         
            this.ground.move();
            this.movePowerups();
            this.character.velocityX = 0;
        };
    };
    
    public static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };

    public movePowerups() {
        for ( let c of this.choppers ) {
            c.move();
        }

        for ( let w of this.wings ) {
            w.move();
        }

        for ( let s of this.shields ) {
            s.move();
        }
    }
    
    public gameOver(){
        clearInterval(this.timer);

        this.bg1.stop();
        this.ground.stop();

        for (var _i = 0; _i < this.shields.length; _i++) {
            this.shields[_i].div.remove();
            this.shields.splice(_i, 1);
        };

        for (var _i = 0; _i < this.wings.length; _i++) {
            this.wings[_i].div.remove();
            this.wings.splice(_i, 1);
        };

        for (var _i = 0; _i < this.choppers.length; _i++) {
            this.choppers[_i].div.remove();
            this.choppers.splice(_i, 1);
        };
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