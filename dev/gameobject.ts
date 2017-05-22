class GameObject {
    
    public div: HTMLElement;
    public y: number;
    public x: number;
    public width: number;
    public height: number;
    
    constructor(tag: string, parent: HTMLElement, x: number, y: number, width: number, height: number){
        this.div = document.createElement(tag);
        parent.appendChild(this.div);
        this.div.style.width = width+"px";
        this.div.style.height = height+"px";
        this.div.style.transform = "translate("+ x +"px, "+ y +"px)";
        
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    };
    
};