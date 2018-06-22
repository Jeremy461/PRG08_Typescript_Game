class Crashed implements CharacterStates {
    
    private character: Character;
    
    constructor(c: Character) {
        this.character = c;
        console.log(this.character.observers);
    };
    
    public move(): void{

    };
};