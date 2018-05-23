/// <reference path="gameobject.ts" />


class PowerUp extends GameObject {

    public observers: Array<Observer> = new Array<Observer>();

    constructor(tag: string, parent: HTMLElement, x: number, y: number, width: number, height: number){
        super(tag, parent, x, y, width, height);
    }

    public move(): void{
        this.div.style.transform = "translateX("+ this.x +"px)";
    }
    
}