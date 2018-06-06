/// <reference path="powerup.ts" />


class Shield extends PowerUp implements Observer {
    constructor(s: Subject){
        super("shield", document.getElementById("container"), Utils.getRandom(0, window.innerWidth) + window.innerWidth, Utils.getRandom(0, window.innerHeight - 200) , 100, 100);

        s.subscribe(this);
        this.move();
    }

    public notify(){
        console.log("shield");
    }
}