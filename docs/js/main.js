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
        this.x = x;
        this.y = y;
    }
    return GameObject;
}());
var Background = (function (_super) {
    __extends(Background, _super);
    function Background(c) {
        _super.call(this, "background", document.getElementById("container"), 0, 0);
        this.div.setAttribute("id", "background");
        this.character = c;
    }
    Background.prototype.move = function () {
        this.x -= 10;
        this.div.style.transform = "translateX(" + this.x + "px)";
    };
    Background.prototype.stop = function () {
        this.div.style.transform = "translateX(" + this.x + "px)";
    };
    return Background;
}(GameObject));
var Catapult = (function (_super) {
    __extends(Catapult, _super);
    function Catapult(g, c) {
        var _this = this;
        _super.call(this, "catapult", document.getElementById("background"), 0, 480);
        this.game = g;
        this.character = c;
        this.click = function () { return _this.onClick(); };
        this.div.addEventListener("click", this.click);
    }
    Catapult.prototype.onClick = function () {
        this.character.state = new Flying(this.character, this.game);
        this.div.removeEventListener("click", this.click);
    };
    return Catapult;
}(GameObject));
var Character = (function (_super) {
    __extends(Character, _super);
    function Character(g) {
        _super.call(this, "character", document.getElementById("container"), 20, 520);
        this.speed = 0;
        this.gravity = 0.5;
        this.speed = 3;
        this.x = 20;
        this.y = 520;
        this.game = g;
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
    ;
    Crashed.prototype.move = function () {
        console.log("game over");
    };
    ;
    return Crashed;
}());
var Flying = (function () {
    function Flying(c, g) {
        var _this = this;
        this.character = c;
        this.game = g;
        this.character.velocityY = -15;
        this.character.velocityX = 10;
        var container = document.getElementById("container");
        this.click = function () { return _this.onClick(); };
        container.addEventListener("click", this.click);
    }
    ;
    Flying.prototype.move = function () {
        this.character.x += this.character.velocityX;
        this.character.y += this.character.velocityY;
        this.character.velocityY += this.character.gravity;
        if (this.character.x >= 400) {
            this.game.background.move();
            this.character.velocityX = 0;
        }
        this.character.div.style.transform = "translate(" + this.character.x + "px, " + this.character.y + "px)";
        if (this.character.y >= 600) {
            this.character.state = new Crashed(this.character);
            this.game.background.stop();
        }
    };
    ;
    Flying.prototype.onClick = function () {
        this.character.velocityY = -15;
    };
    return Flying;
}());
var Ground = (function (_super) {
    __extends(Ground, _super);
    function Ground() {
        _super.call(this, "ground", document.getElementById("background"), 0, 615);
    }
    return Ground;
}(GameObject));
var Game = (function () {
    function Game() {
        var _this = this;
        this.character = new Character(this);
        this.background = new Background(this.character);
        this.ground = new Ground();
        this.catapult = new Catapult(this, this.character);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    ;
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.character.move();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    ;
    return Game;
}());
;
window.addEventListener("load", function () {
    new Game();
});
var Stationary = (function () {
    function Stationary(c) {
        this.character = c;
    }
    Stationary.prototype.move = function () {
    };
    ;
    return Stationary;
}());
//# sourceMappingURL=main.js.map