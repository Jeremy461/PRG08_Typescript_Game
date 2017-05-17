/// <reference path="gameobject.ts" />


class Character extends GameObject {
    
    speed: number;
    state: CharacterStates;
    
    constructor(){
        super("character", document.getElementById("container"), 20, 520);
        
        this.speed = 3;
        this.x = 20;
        
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