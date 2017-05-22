var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameObject = (function () {
    function GameObject(tag, parent, x, y, width, height) {
        this.div = document.createElement(tag);
        parent.appendChild(this.div);
        this.div.style.width = width + "px";
        this.div.style.height = height + "px";
        this.div.style.transform = "translate(" + x + "px, " + y + "px)";
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    ;
    return GameObject;
}());
;
var Background = (function (_super) {
    __extends(Background, _super);
    function Background(c) {
        _super.call(this, "background", document.getElementById("container"), 0, 0, 10000, 720);
        this.div.setAttribute("id", "background");
        this.character = c;
    }
    ;
    Background.prototype.move = function () {
        this.x -= 10;
        this.div.style.transform = "translateX(" + this.x + "px)";
    };
    ;
    Background.prototype.stop = function () {
        this.div.style.transform = "translateX(" + this.x + "px)";
    };
    ;
    return Background;
}(GameObject));
;
var Catapult = (function (_super) {
    __extends(Catapult, _super);
    function Catapult(c) {
        var _this = this;
        _super.call(this, "catapult", document.getElementById("background"), 0, 480, 400, 200);
        this.character = c;
        this.click = function () { return _this.onClick(); };
        this.div.addEventListener("click", this.click);
    }
    ;
    Catapult.prototype.onClick = function () {
        this.character.state = new Flying(this.character);
        this.div.removeEventListener("click", this.click);
    };
    ;
    return Catapult;
}(GameObject));
;
var Character = (function (_super) {
    __extends(Character, _super);
    function Character() {
        _super.call(this, "character", document.getElementById("container"), 20, 520, 70, 70);
        this.speed = 0;
        this.gravity = 0.5;
        this.speed = 3;
        this.x = 20;
        this.y = 520;
        this.state = new Stationary(this);
    }
    ;
    Character.prototype.move = function () {
        this.state.move();
    };
    ;
    return Character;
}(GameObject));
;
;
var Crashed = (function () {
    function Crashed(c) {
        this.character = c;
    }
    ;
    Crashed.prototype.move = function () {
        var g = Game.getInstance();
        g.gameOver();
    };
    ;
    return Crashed;
}());
;
var Flying = (function () {
    function Flying(c) {
        var _this = this;
        this.character = c;
        this.game = Game.getInstance();
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
        ;
        if (Utils.checkCollision(this.character, this.game.ground)) {
            this.character.state = new Crashed(this.character);
            this.game.background.stop();
        }
        ;
        this.character.div.style.transform = "translate(" + this.character.x + "px, " + this.character.y + "px)";
    };
    ;
    Flying.prototype.onClick = function () {
        this.character.velocityY = -15;
    };
    ;
    return Flying;
}());
;
var Ground = (function (_super) {
    __extends(Ground, _super);
    function Ground() {
        _super.call(this, "ground", document.getElementById("background"), 0, 615, 10000, 108);
    }
    ;
    return Ground;
}(GameObject));
;
var Game = (function () {
    function Game() {
        var _this = this;
        this.character = new Character();
        this.background = new Background(this.character);
        this.ground = new Ground();
        this.catapult = new Catapult(this.character);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    ;
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.character.move();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    ;
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    ;
    Game.prototype.gameOver = function () {
        console.log("game over");
    };
    ;
    return Game;
}());
;
window.addEventListener("load", function () {
    var g = Game.getInstance();
});
var Stationary = (function () {
    function Stationary(c) {
        this.character = c;
    }
    ;
    Stationary.prototype.move = function () {
    };
    ;
    return Stationary;
}());
var Utils = (function () {
    function Utils() {
    }
    Utils.checkCollision = function (n, m) {
        return (n.x < m.x + m.width &&
            n.x + n.width > m.x &&
            n.y < m.y + m.height &&
            n.height + n.y > m.y);
    };
    Utils.getRandom = function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    return Utils;
}());
//# sourceMappingURL=main.js.map