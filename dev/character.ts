/// <reference path="gameobject.ts" />


class Character extends GameObject {
    
    public speed: number = 0;
    public state: CharacterStates;
    public gravity: number = 0.5;
    public velocityY: number; public velocityX: number;
    
    constructor(){
        super("character", document.getElementById("container"), 20, 520);
        
        this.speed = 3;
        this.x = 20;
        this.y = 520;
        
        this.state = new Stationary(this);
    }
    
    public move(): void{
        this.state.move();
    }
    
}