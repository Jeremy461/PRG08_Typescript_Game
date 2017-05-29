class Crashed implements CharacterStates {
    
    public character: Character;
    
    constructor(c: Character) {
        this.character = c;
    };
    
    public move(): void{
        let g = Game.getInstance();
        g.gameOver();
    };
};