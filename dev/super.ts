/// <reference path="powerup.ts" />

class Super extends PowerUp implements Subject {

    private character: Character;
    public observers:Array<Observer> = new Array<Observer>();
    private game: Game;

    constructor(){
        super("super", document.getElementById("container"), Utils.getRandom(0, window.innerWidth) + window.innerWidth, Utils.getRandom(0, window.innerHeight - 200), 73, 65);
        this.observers = [];
    };

    public subscribe(o:Observer): void{
        this.observers.push(o); 
    };

    public unsubscribe(o:Observer): void{

    }; 

    public notifyObservers(){
        for (let o of this.observers) {
            o.notify();
        };
    };

    public move(){
        this.x -= 10;
        this.div.style.transform = "translate("+ this.x +"px, "+ this.y +"px)";
    };
};