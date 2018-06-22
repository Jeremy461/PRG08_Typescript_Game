class Flying implements CharacterStates {
    
    private character: Character;
    private click: EventListener;
    private game: Game;
    private container: HTMLElement;
    
    constructor(c: Character) {
        
        this.character = c;
        this.game = Game.getInstance();
        this.character.velocityY = -15;
        this.character.velocityX = 10;
        if(this.character.shielded) {
            this.character.div.style.backgroundImage = "url(\"../docs/images/characterShield.png\")";
        } else {
            this.character.div.style.backgroundImage = "url(\"../docs/images/character.png\")"; 
        }
        
        this.container = document.getElementById("container");
        this.click = () => this.onClick();
        this.container.addEventListener("click", this.click);
    };
    
    public move(): void{
        
        this.character.x += this.character.velocityX;
        this.character.y += this.character.velocityY;
        this.character.velocityY += this.character.gravity;
        
        if(this.character.y < 0){
            this.character.y = 0;
            this.character.velocityY = 0;
        };

        if(Utils.checkCollision(this.character, this.game.ground)){
            if(this.character.shielded) {
                this.character.velocityY = -15;
                let _this = this;
                setTimeout(function() {
                    _this.character.shielded = false;
                    console.log('shield off');
                }, 200);
                this.character.div.style.backgroundImage = "url(\"../docs/images/character.png\")";
            } else {
                this.character.state = new Crashed(this.character);
                this.game.gameOver();               
            }
        };
        
        this.character.div.style.transform = "translate("+ this.character.x +"px, "+ this.character.y +"px)";

        for (var _i = 0; _i < this.game.wings.length; _i++) {
            if(Utils.checkCollision(this.character, this.game.wings[_i])){
                this.game.wings[_i].div.remove();
                this.game.wings.splice(_i, 1);
                this.character.fuel += 5;
            };
        };

        for (var _i = 0; _i < this.game.choppers.length; _i++) {
            if(Utils.checkCollision(this.character, this.game.choppers[_i])){
                this.game.choppers[_i].div.remove();
                this.game.choppers.splice(_i, 1);
                this.container.removeEventListener("click", this.click);
                this.character.state = new ChopperState(this.character);
            };
        };

        for (var _i = 0; _i < this.game.shields.length; _i++) {
            if(Utils.checkCollision(this.character, this.game.shields[_i])){
                this.game.shields[_i].div.remove();
                this.game.shields.splice(_i, 1);
                this.character.shielded = true;
                this.character.div.style.backgroundImage = "url(\"../docs/images/characterShield.png\")";
            };
        };
        
    };
    
    private onClick(): void{
        if(this.character.fuel > 0){
            this.character.velocityY = -15;
        }
        this.character.fuel--;
    };
};