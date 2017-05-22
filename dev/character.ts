/// <reference path="gameobject.ts" />


class Character extends GameObject {
    
    speed: number = 0;
    state: CharacterStates;
    gravity: number = 0.5;
    velocityY: number; velocityX: number;
    
    private game: Game;
    
    constructor(g: Game){
        super("character", document.getElementById("container"), 20, 520);
        
        this.speed = 3;
        this.x = 20;
        this.y = 520;
        
        this.game = g;
        
        this.state = new Stationary(this);
    }
    
    public move(): void{
        this.state.move();
        // this.div.style.transform = "translate("+ this.x +"px, 520px)";
    }
    
    public update(): void{
        this.state.move();
    }
    
}