/// <reference path="gameobject.ts" />


class Catapult extends GameObject {
    
    private character: Character;
    private click: EventListener;
    
    constructor(c: Character){
        super("catapult", document.getElementById("background"), 0, 455, 400, 200);
        
        this.character = c;
        
        this.click = () => this.onClick();
        this.div.addEventListener("click", this.click);
        
    };
    
    private onClick(): void{
        this.character.state = new Flying(this.character);
        this.div.removeEventListener("click", this.click);
    };
    
    
};