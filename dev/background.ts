/// <reference path="gameobject.ts" />


class Background extends GameObject {
    
    private character: Character;
    
    constructor(c: Character){
        super("background", document.getElementById("container"), 0, 0, 10000, 720);
        this.div.setAttribute("id", "background");
        this.character = c;
    };
    
    public move(): void{
        this.x -= 10;
        this.div.style.transform = "translateX("+ this.x +"px)";
    };
    
    public stop(): void{
        this.div.style.transform = "translateX("+ this.x +"px)";
    };
    
};