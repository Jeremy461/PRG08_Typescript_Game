/// <reference path="powerup.ts" />


class Wing extends PowerUp implements Observer {

private character: Character;

    constructor(x: number, s: Subject){

        super("wings", document.getElementById("container"), x + (window.innerWidth / 2), Utils.getRandom(0, window.innerHeight - 200), 50, 52);
    
        s.subscribe(this);
        this.move();
    }

    public notify(){
        console.log("wing");
    }
}