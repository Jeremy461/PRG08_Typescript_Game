/// <reference path="ground.ts" />


class Game {
    
    public ground: Ground;
    private character: Character;
    public background: Background;
    private fuel: Fuel;

    public wings: Array<Wing> = new Array<Wing>();
    public choppers: Array<Chopper> = new Array<Chopper>();
    public shields: Array<Shield> = new Array<Shield>();
    public supers: Array<Super> = new Array<Super>();

    private static instance: Game;
    private timer;
    private loop;
    
    constructor() {
        this.character = new Character();
        this.background = new Background(this.character);
        this.ground = new Ground();
        this.fuel = new Fuel();
        this.supers.push(new Super());
        this.supers[0].div.style.transform = "translateX(1500px, 615px)";
        
        this.timer = setInterval(() => this.spawnPowerUp(), 1500);
 
        this.loop = requestAnimationFrame(() => this.gameLoop());
    };

    private gameLoop(){
        this.character.move();
        requestAnimationFrame(() => this.gameLoop());
        this.fuel.div.style.width = this.character.fuel * 49.5 + "px";
                
        if(this.character.x >= 400 && !Utils.checkCollision(this.character, this.ground)){
            this.background.move();         
            this.ground.move();
            this.movePowerups();
            this.character.velocityX = 0;
        };
    };
    
    public static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
        };
        return Game.instance;
    };

    public movePowerups() {
        for ( let c of this.choppers ) {
            c.move();
        };

        for ( let w of this.wings ) {
            w.move();
        };

        for ( let s of this.shields ) {
            s.move();
        };

        for ( let mushroom of this.supers.slice(1) ) {
            mushroom.move();
        };
    };
    
    public gameOver(){
        clearInterval(this.timer);

        this.background.stop();
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

        for (var _i = 0; _i < this.supers.length; _i++) {
            this.supers[_i].div.remove();
            this.supers.splice(_i, 1);
        };
    };

    private spawnPowerUp(){
        let powerUpChoice = Math.floor((Math.random() * 12) + 1);

        switch(powerUpChoice){
            case 1:
            case 2:
            case 3:
                console.log("new Wing");
                this.wings.push(new Wing(this.supers[this.supers.length - 1]));
                break;
            case 4:
            case 5:
            case 6:
                console.log("new Shield");
                this.shields.push(new Shield(this.supers[this.supers.length - 1]));
                break;
            case 7:
            case 8:
            case 9:
                console.log("new Chopper");
                this.choppers.push(new Chopper(this.supers[this.supers.length - 1]));
                break;
            case 10:
                console.log("new Super");
                this.supers.push(new Super());          
                break;
        };
    };
   
}; 

// load
window.addEventListener("load", function() {
    let g = Game.getInstance();
});