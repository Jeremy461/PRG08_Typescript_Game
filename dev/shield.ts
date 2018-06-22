/// <reference path="powerup.ts" />

class Shield extends PowerUp implements Observer {
    constructor(s: Subject){
        super("shield", document.getElementById("container"), Utils.getRandom(0, window.innerWidth) + window.innerWidth, Utils.getRandom(0, window.innerHeight - 200) , 100, 100);

        s.subscribe(this);
    };

    public notify(){
        this.div.style.width = '200px';
        this.div.style.height = '200px';
    };
};