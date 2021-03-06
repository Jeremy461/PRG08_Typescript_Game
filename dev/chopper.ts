/// <reference path="powerup.ts" />


class Chopper extends PowerUp implements Observer {
    constructor(s: Subject){
        super("chopper", document.getElementById("container"), Utils.getRandom(0, window.innerWidth) + window.innerWidth, Utils.getRandom(0, window.innerHeight - 200), 90, 35);
    
        s.subscribe(this);
    };

    public notify(){
        this.div.style.width = '180px';
        this.div.style.height = '70px';
    };
};