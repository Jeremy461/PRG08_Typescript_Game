class Flying implements CharacterStates {
    
    public character: Character;
    private click: EventListener;
    private game: Game;
    
    constructor(c: Character) {
        
        this.character = c;
        this.game = Game.getInstance();
        this.character.velocityY = -15;
        this.character.velocityX = 10;
        
        let container = document.getElementById("container");
        this.click = () => this.onClick();
        container.addEventListener("click", this.click);
    };
    
    public move(): void{
        this.character.x += this.character.velocityX;
        this.character.y += this.character.velocityY;
        this.character.velocityY += this.character.gravity;
        
        if(this.character.x >= 400){
            this.game.background.move();            
            this.character.velocityX = 0;
        };
        
        if(Utils.checkCollision(this.character, this.game.ground)){
            this.character.state = new Crashed(this.character);
            this.game.background.stop();
        };
        
        this.character.div.style.transform = "translate("+ this.character.x +"px, "+ this.character.y +"px)";
        
    };
    
    private onClick(): void{
        this.character.velocityY = -15;
    };
};