/// <reference path="gameobject.ts" />


class Catapult extends GameObject {
    
    private game: Game;
    private character: Character;
    
    private click: EventListener;
    
    constructor(g: Game, c: Character){
        super("catapult", document.getElementById("background"), 0, 480);
        
        this.game = g;
        this.character = c;
        
        this.click = () => this.onClick();
        this.div.addEventListener("click", this.click);
        
    }
    
    private onClick(): void{
        this.character.state = new Flying(this.character, this.game);
        this.div.removeEventListener("click", this.click);
    }
    
    
}