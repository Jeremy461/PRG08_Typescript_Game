class Flying implements CharacterStates {
    
    private character: Character;
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
            this.game.bg1.move();         
            this.game.ground.move();  
            this.character.velocityX = 0;
        };
        
        if(Utils.checkCollision(this.character, this.game.ground)){
            this.character.state = new Crashed(this.character);
            this.game.bg1.stop();
            this.game.ground.move();
        };
        
        if(this.character.y < 0){
            this.character.y = 0;
            this.character.velocityY = 0;
        }
        
        this.character.div.style.transform = "translate("+ this.character.x +"px, "+ this.character.y +"px)";

        let g = Game.getInstance();
        for (var _i = 0; _i < g.wings.length; _i++) {
            if(Utils.checkCollision(this.character, g.wings[_i])){
                console.log("collision");   
                // g.wings.splice(_i, 1);
                this.character.fuel += 5;
            };
        };

        for (var _i = 0; _i < g.choppers.length; _i++) {
            if(Utils.checkCollision(this.character, g.choppers[_i])){
                console.log("collision");
                // g.choppers.splice(_i, 1);
                this.character.fuel += 5;
            };
        };

        for (var _i = 0; _i < g.shields.length; _i++) {
            if(Utils.checkCollision(this.character, g.shields[_i])){
                console.log("collision");
                // g.shields.splice(_i, 1);
                this.character.fuel += 5;
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