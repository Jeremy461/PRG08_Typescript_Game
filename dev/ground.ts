class Ground extends GameObject {
    
    constructor(){
        super("ground", document.getElementById("container"), 0, 615, 50000, 108);  
    };
    
    public move(): void{
        this.x -= 10;
        this.div.style.transform = "translate("+ this.x +"px, 615px)";
    };
    
    public stop(): void{
        this.div.style.transform = "translateX("+ this.x +"px, 615px)";
    };
    
};