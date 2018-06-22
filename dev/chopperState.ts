class ChopperState implements CharacterStates {
    
    private character: Character;
    private game: Game;
    private timer: number = 0;
    
    constructor(c: Character) {
        this.character = c;
        this.game = Game.getInstance();
        this.character.velocityY = -5;
        this.character.velocityX = 10;
        this.character.div.style.backgroundImage = "url(\"../docs/images/characterChopper.png\")";
    };
    
    public move(): void{
        this.timer++;
        this.character.x += this.character.velocityX;
        this.character.y += this.character.velocityY;
        
        if(this.character.y < 0){
            this.character.y = 0;
            this.character.velocityY = 0;
        };

        if(this.timer > 150) {
            this.character.state = new Flying(this.character);
        };

        this.character.div.style.transform = "translate("+ this.character.x +"px, "+ this.character.y +"px)";
    };
};