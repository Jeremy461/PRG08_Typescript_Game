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
        _super.call(this, "background", document.getElementById("container"), 0, 0, 50000, 720);
        this.div.setAttribute("id", "background");
        this.character = c;
        this.catapult = new Catapult(this.character);
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
        _super.call(this, "catapult", document.getElementById("background"), 0, 455, 400, 200);
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
        _super.call(this, "character", document.getElementById("container"), 20, 495, 70, 70);
        this.speed = 0;
        this.gravity = 0.5;
        this.fuel = 10;
        this.shielded = false;
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
var PowerUp = (function (_super) {
    __extends(PowerUp, _super);
    function PowerUp(tag, parent, x, y, width, height) {
        _super.call(this, tag, parent, x, y, width, height);
        this.observers = new Array();
    }
    ;
    PowerUp.prototype.move = function () {
        this.x -= 10;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    ;
    PowerUp.prototype.stop = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + ")";
    };
    ;
    return PowerUp;
}(GameObject));
;
var Chopper = (function (_super) {
    __extends(Chopper, _super);
    function Chopper(s) {
        _super.call(this, "chopper", document.getElementById("container"), Utils.getRandom(0, window.innerWidth) + window.innerWidth, Utils.getRandom(0, window.innerHeight - 200), 90, 35);
        s.subscribe(this);
    }
    ;
    Chopper.prototype.notify = function () {
        this.div.style.width = '180px';
        this.div.style.height = '70px';
    };
    ;
    return Chopper;
}(PowerUp));
;
var ChopperState = (function () {
    function ChopperState(c) {
        this.timer = 0;
        this.character = c;
        this.game = Game.getInstance();
        this.character.velocityY = -5;
        this.character.velocityX = 10;
        this.character.div.classList.add('chopper');
    }
    ;
    ChopperState.prototype.move = function () {
        this.timer++;
        this.character.x += this.character.velocityX;
        this.character.y += this.character.velocityY;
        if (this.character.y < 0) {
            this.character.y = 0;
            this.character.velocityY = 0;
        }
        ;
        if (this.timer > 150) {
            this.character.div.classList.remove('chopper');
            this.character.state = new Flying(this.character);
        }
        ;
        this.character.div.style.transform = "translate(" + this.character.x + "px, " + this.character.y + "px)";
    };
    ;
    return ChopperState;
}());
;
var Flying = (function () {
    function Flying(c) {
        var _this = this;
        this.character = c;
        this.game = Game.getInstance();
        this.character.velocityY = -15;
        this.character.velocityX = 10;
        if (this.character.shielded) {
            this.character.div.classList.add('shielded');
        }
        ;
        this.container = document.getElementById("container");
        this.click = function () { return _this.onClick(); };
        this.container.addEventListener("mousedown", this.click);
    }
    ;
    Flying.prototype.move = function () {
        this.character.x += this.character.velocityX;
        this.character.y += this.character.velocityY;
        this.character.velocityY += this.character.gravity;
        if (this.character.y < 0) {
            this.character.y = 0;
            this.character.velocityY = 0;
        }
        ;
        if (Utils.checkCollision(this.character, this.game.ground)) {
            if (this.character.shielded) {
                this.character.velocityY = -20;
                var _this_1 = this;
                setTimeout(function () {
                    _this_1.character.shielded = false;
                    console.log('shield off');
                }, 200);
                this.character.div.classList.remove('shielded');
            }
            else {
                this.character.state = new Stationary(this.character);
                this.game.gameOver();
            }
            ;
        }
        ;
        this.character.div.style.transform = "translate(" + this.character.x + "px, " + this.character.y + "px)";
        for (var _i = 0; _i < this.game.wings.length; _i++) {
            if (Utils.checkCollision(this.character, this.game.wings[_i])) {
                this.game.wings[_i].div.remove();
                this.game.wings.splice(_i, 1);
                this.character.fuel += 5;
            }
            ;
        }
        ;
        for (var _i = 0; _i < this.game.choppers.length; _i++) {
            if (Utils.checkCollision(this.character, this.game.choppers[_i])) {
                this.game.choppers[_i].div.remove();
                this.game.choppers.splice(_i, 1);
                this.container.removeEventListener("mousedown", this.click);
                this.character.state = new ChopperState(this.character);
            }
            ;
        }
        ;
        for (var _i = 0; _i < this.game.shields.length; _i++) {
            if (Utils.checkCollision(this.character, this.game.shields[_i])) {
                this.game.shields[_i].div.remove();
                this.game.shields.splice(_i, 1);
                this.character.shielded = true;
                this.character.div.classList.add('shielded');
            }
            ;
        }
        ;
        for (var _i = 0; _i < this.game.supers.length; _i++) {
            if (Utils.checkCollision(this.character, this.game.supers[_i])) {
                this.game.supers[_i].div.remove();
                this.game.supers[_i].notifyObservers();
                this.game.supers.splice(_i, 1);
            }
            ;
        }
        ;
    };
    ;
    Flying.prototype.onClick = function () {
        if (this.character.fuel > 0) {
            this.character.velocityY = -15;
        }
        ;
        this.character.fuel--;
    };
    ;
    return Flying;
}());
;
var Fuel = (function (_super) {
    __extends(Fuel, _super);
    function Fuel() {
        _super.call(this, "fuel", document.getElementById("container"), 20, 20, 50, 50);
    }
    ;
    return Fuel;
}(GameObject));
;
var Ground = (function (_super) {
    __extends(Ground, _super);
    function Ground() {
        _super.call(this, "ground", document.getElementById("container"), 0, 615, 50000, 108);
    }
    ;
    Ground.prototype.move = function () {
        this.x -= 10;
        this.div.style.transform = "translate(" + this.x + "px, 615px)";
    };
    ;
    Ground.prototype.stop = function () {
        this.div.style.transform = "translateX(" + this.x + "px, 615px)";
    };
    ;
    return Ground;
}(GameObject));
;
var Game = (function () {
    function Game() {
        var _this = this;
        this.wings = new Array();
        this.choppers = new Array();
        this.shields = new Array();
        this.supers = new Array();
        this.character = new Character();
        this.background = new Background(this.character);
        this.ground = new Ground();
        this.fuel = new Fuel();
        this.supers.push(new Super());
        this.supers[0].div.style.transform = "translateX(1500px, 615px)";
        this.timer = setInterval(function () { return _this.spawnPowerUp(); }, 1500);
        this.loop = requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    ;
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.character.move();
        requestAnimationFrame(function () { return _this.gameLoop(); });
        this.fuel.div.style.width = this.character.fuel * 49.5 + "px";
        if (this.character.x >= 400 && !Utils.checkCollision(this.character, this.ground)) {
            this.background.move();
            this.ground.move();
            this.movePowerups();
            this.character.velocityX = 0;
        }
        ;
    };
    ;
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        ;
        return Game.instance;
    };
    ;
    Game.prototype.movePowerups = function () {
        for (var _a = 0, _b = this.choppers; _a < _b.length; _a++) {
            var c = _b[_a];
            c.move();
        }
        ;
        for (var _c = 0, _d = this.wings; _c < _d.length; _c++) {
            var w = _d[_c];
            w.move();
        }
        ;
        for (var _e = 0, _f = this.shields; _e < _f.length; _e++) {
            var s = _f[_e];
            s.move();
        }
        ;
        for (var _g = 0, _h = this.supers.slice(1); _g < _h.length; _g++) {
            var mushroom = _h[_g];
            mushroom.move();
        }
        ;
    };
    ;
    Game.prototype.gameOver = function () {
        clearInterval(this.timer);
        this.background.stop();
        this.ground.stop();
        for (var _i = 0; _i < this.shields.length; _i++) {
            this.shields[_i].div.remove();
            this.shields.splice(_i, 1);
        }
        ;
        for (var _i = 0; _i < this.wings.length; _i++) {
            this.wings[_i].div.remove();
            this.wings.splice(_i, 1);
        }
        ;
        for (var _i = 0; _i < this.choppers.length; _i++) {
            this.choppers[_i].div.remove();
            this.choppers.splice(_i, 1);
        }
        ;
        for (var _i = 0; _i < this.supers.length; _i++) {
            this.supers[_i].div.remove();
            this.supers.splice(_i, 1);
        }
        ;
    };
    ;
    Game.prototype.spawnPowerUp = function () {
        var powerUpChoice = Math.floor((Math.random() * 12) + 1);
        switch (powerUpChoice) {
            case 1:
            case 2:
            case 3:
                console.log("new Wing");
                this.wings.push(new Wing(this.supers[this.supers.length - 1]));
                break;
            case 4:
            case 5:
            case 6:
                console.log("new Shield");
                this.shields.push(new Shield(this.supers[this.supers.length - 1]));
                break;
            case 7:
            case 8:
            case 9:
                console.log("new Chopper");
                this.choppers.push(new Chopper(this.supers[this.supers.length - 1]));
                break;
            case 10:
                console.log("new Super");
                this.supers.push(new Super());
                break;
        }
        ;
    };
    ;
    return Game;
}());
;
window.addEventListener("load", function () {
    var g = Game.getInstance();
});
;
var Shield = (function (_super) {
    __extends(Shield, _super);
    function Shield(s) {
        _super.call(this, "shield", document.getElementById("container"), Utils.getRandom(0, window.innerWidth) + window.innerWidth, Utils.getRandom(0, window.innerHeight - 200), 100, 100);
        s.subscribe(this);
    }
    ;
    Shield.prototype.notify = function () {
        this.div.style.width = '200px';
        this.div.style.height = '200px';
    };
    ;
    return Shield;
}(PowerUp));
;
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
;
;
var Super = (function (_super) {
    __extends(Super, _super);
    function Super() {
        _super.call(this, "super", document.getElementById("container"), Utils.getRandom(0, window.innerWidth) + window.innerWidth, Utils.getRandom(0, window.innerHeight - 200), 73, 65);
        this.observers = new Array();
        this.observers = [];
    }
    ;
    Super.prototype.subscribe = function (o) {
        this.observers.push(o);
    };
    ;
    Super.prototype.unsubscribe = function (o) {
    };
    ;
    Super.prototype.notifyObservers = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var o = _a[_i];
            o.notify();
        }
        ;
    };
    ;
    Super.prototype.move = function () {
        this.x -= 10;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    ;
    return Super;
}(PowerUp));
;
var Utils = (function () {
    function Utils() {
    }
    Utils.checkCollision = function (n, m) {
        return (n.x < m.x + m.width &&
            n.x + n.width > m.x &&
            n.y < m.y + m.height &&
            n.height + n.y > m.y);
    };
    ;
    Utils.getRandom = function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    ;
    return Utils;
}());
;
var Wing = (function (_super) {
    __extends(Wing, _super);
    function Wing(s) {
        _super.call(this, "wings", document.getElementById("container"), Utils.getRandom(0, window.innerWidth) + window.innerWidth, Utils.getRandom(0, window.innerHeight - 200), 50, 52);
        s.subscribe(this);
    }
    ;
    Wing.prototype.notify = function () {
        console.log('wings notify:');
        console.log(this.div.style.width);
        this.div.style.width = '100px';
        this.div.style.height = '100px';
    };
    ;
    return Wing;
}(PowerUp));
;
//# sourceMappingURL=main.js.map