class Flying implements CharacterStates {
    
    character: Character;
    
    constructor(c: Character) {
        this.character = c;
    }
    
    public move(): void{
        console.log("flying");
    };
}