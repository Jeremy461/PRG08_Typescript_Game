/// <reference path="powerup.ts" />


class Wing extends PowerUp implements Observer {

private character: Character;

    constructor(s: Subject){

        super("wings", document.getElementById("container"), Utils.getRandom(0, window.innerWidth) + window.innerWidth, Utils.getRandom(0, window.innerHeight - 200), 50, 52);
    
        s.subscribe(this);
        this.move();
    }

    public notify(){
        console.log("wing");
    }
}