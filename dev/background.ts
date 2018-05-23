/// <reference path="gameobject.ts" />


class Background extends GameObject {
    
    private character: Character;
    private catapult: Catapult;
    
    constructor(c: Character){
        super("background", document.getElementById("container"), 0, 0, 50000, 720);
        this.div.setAttribute("id", "background");
        this.character = c;
        this.catapult = new Catapult(this.character);
    };
    
    public move(): void{
        this.x -= 10;
        this.div.style.transform = "translateX("+ this.x +"px)";
    };
    
    public stop(): void{
        this.div.style.transform = "translateX("+ this.x +"px)";
    };
    
};