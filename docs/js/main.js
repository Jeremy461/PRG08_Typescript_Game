var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameObject = (function () {
    function GameObject(tag, parent, x, y) {
        this.div = document.createElement(tag);
        parent.appendChild(this.div);
        this.div.style.transform = "translate(" + x + "px, " + y + "px)";
    }
    return GameObject;
}());
var Catapult = (function (_super) {
    __extends(Catapult, _super);
    function Catapult(g, c) {
        _super.call(this, "catapult", document.getElementById("container"), 0, 480);
        this.game = g;
        this.character = c;
        this.div.addEventListener("click", this.onClick);
    }
    Catapult.prototype.onClick = function () {
        console.log(this.character);
        this.character.state = new Flying(this.character);
    };
    return Catapult;
}(GameObject));
var Character = (function (_super) {
    __extends(Character, _super);
    function Character() {
        _super.call(this, "character", document.getElementById("container"), 20, 520);
        this.speed = 3;
        this.x = 20;
        this.state = new Stationary(this);
    }
    Character.prototype.move = function () {
        this.state.move();
    };
    Character.prototype.update = function () {
        this.state.move();
    };
    return Character;
}(GameObject));
var Crashed = (function () {
    function Crashed(c) {
        this.character = c;
    }
    Crashed.prototype.move = function () {
    };
    ;
    return Crashed;
}());
var Flying = (function () {
    function Flying(c) {
        this.character = c;
    }
    Flying.prototype.move = function () {
        console.log("flying");
    };
    ;
    return Flying;
}());
var Ground = (function (_super) {
    __extends(Ground, _super);
    function Ground() {
        _super.call(this, "ground", document.getElementById("container"), 0, 615);
    }
    return Ground;
}(GameObject));
var Game = (function () {
    function Game() {
        var _this = this;
        this.ground = new Ground();
        this.character = new Character();
        this.catapult = new Catapult(this, this.character);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.character.move();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var Stationary = (function () {
    function Stationary(c) {
        this.character = c;
    }
    Stationary.prototype.move = function () {
        console.log("test");
    };
    ;
    return Stationary;
}());
//# sourceMappingURL=main.js.map