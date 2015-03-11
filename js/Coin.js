CatcherGame.Coin = function (factory, target, speed, direction) {
    "use strict";
    this.alive = true;

    this.speed = speed / 10;
    this.direction = direction;
    this.angle = CatcherGame.dirToAngle(direction);

    this.sprite = factory.sprite(target.x, target.y, 'square');
    this.sprite.angle = this.angle;
    this.sprite.anchor.setTo(0.5, 0.5);

    this.moveBack();
};

CatcherGame.Coin.UP = 0;
CatcherGame.Coin.DOWN = 180;
CatcherGame.Coin.LEFT = 270;
CatcherGame.Coin.RIGHT = 90;
CatcherGame.Coin.COLLECT_DISTANCE = 10;
CatcherGame.Coin.OFFSCREEN_DISTANCE = 600;

CatcherGame.Coin.prototype = {
    moveBack: function () {
        "use strict";
        this.sprite[this.getAxis()] += this.getSign(true) * CatcherGame.Coin.OFFSCREEN_DISTANCE;
    },

    getSign: function (invert) {
        "use strict";
        if (this.direction === 'n' || this.direction === 'w') {
            return invert ? 1 : -1;
        } else {
            return invert ? -1 : 1;
        }
    },

    getAxis: function () {
        "use strict";
        if (this.direction === 'n' || this.direction === 's') {
            return 'y';
        } else {
            return 'x';
        }
    },

    collect: function (pos) {
        "use strict";
        if (Math.abs(pos.x - this.sprite.x) > CatcherGame.Coin.COLLECT_DISTANCE || Math.abs(pos.y - this.sprite.y) > CatcherGame.Coin.COLLECT_DISTANCE) {
            return false;
        }
        this.collected = true;
        this.die();
        return true;
    },

    isAlive: function () {
        "use strict";
        return this.alive;
    },

    die: function () {
        "use strict";
        this.sprite.destroy();
        this.alive = false;
    },

	update: function () {
        "use strict";
        this.sprite[this.getAxis()] += this.speed * this.getSign();
	}
};
