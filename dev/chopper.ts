/// <reference path="powerup.ts" />


class Chopper extends PowerUp implements Observer {
    constructor(x: number, s: Subject){
        super("chopper", document.getElementById("container"), x + (window.innerWidth / 2), Utils.getRandom(0, window.innerHeight - 200), 90, 35);
    
        s.subscribe(this);
        this.move();
    }

    public notify(){
        console.log("chopper");
    }
}