class Crashed implements CharacterStates {
    
    private character: Character;
    
    constructor(c: Character) {
        this.character = c;
    };
    
    public move(): void{
        let g = Game.getInstance();
        g.gameOver();
    };
};