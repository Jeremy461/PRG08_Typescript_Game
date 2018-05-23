/// <reference path="powerup.ts" />


class Shield extends PowerUp implements Observer {
    constructor(x: number, s: Subject){
        super("shield", document.getElementById("container"), x + (window.innerWidth / 2), Utils.getRandom(0, window.innerHeight - 200) , 100, 100);

        s.subscribe(this);
        this.move();
    }

    public notify(){
        console.log("shield");
    }
}