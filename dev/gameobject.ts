class GameObject {
    
    public div: HTMLElement;
    public y: number;
    public x: number;
    
    constructor(tag: string, parent: HTMLElement, x: number, y: number){
        this.div = document.createElement(tag);
        parent.appendChild(this.div);
        this.div.style.transform = "translate("+ x +"px, "+ y +"px)";
        
        this.x = x;
        this.y = y;
    }
    
}