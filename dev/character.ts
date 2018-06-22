/// <reference path="gameobject.ts" />


class Character extends GameObject {
    public speed: number = 0;
    public state: CharacterStates;
    public gravity: number = 0.5;
    public velocityY: number; public velocityX: number;
    public fuel: number = 10;
    public shielded: boolean = false;
    
    constructor(){
        super("character", document.getElementById("container"), 20, 495, 70, 70);
        
        this.speed = 3;
        this.x = 20;
        this.y = 520;
        
        this.state = new Stationary(this);
    };
    
    public move(): void{
        this.state.move();
    }; 
};