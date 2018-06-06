/// <reference path="gameobject.ts" />


class PowerUp extends GameObject {

    public observers: Array<Observer> = new Array<Observer>();

    constructor(tag: string, parent: HTMLElement, x: number, y: number, width: number, height: number){
        super(tag, parent, x, y, width, height);
    }

    public move(): void{
        this.x -= 10;
        this.div.style.transform = "translate("+ this.x +"px, "+ this.y +"px)";
    }

    public stop(): void {
        this.div.style.transform = "translate("+ this.x +"px, "+ this.y +")";
    }
    
}