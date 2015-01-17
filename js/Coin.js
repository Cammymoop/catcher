CatcherGame.Coin = function (factory, target, speed, direction) {
    "use strict";
    this.speed = speed / 10;
    this.direction = direction;
    this.angle = direction;

    this.sprite = factory.sprite(target.x, target.y, 'square');
    this.sprite.anchor.setTo(0.5, 0.5);

    this.moveBack();
};

CatcherGame.Coin.UP = 0;
CatcherGame.Coin.DOWN = 180;
CatcherGame.Coin.LEFT = 270;
CatcherGame.Coin.RIGHT = 90;
CatcherGame.Coin.OFFSCREEN_DISTANCE = 600;

CatcherGame.Coin.prototype = {
    moveBack: function () {
        "use strict";
        this.sprite[this.getAxis()] += this.getSign(true) * CatcherGame.Coin.OFFSCREEN_DISTANCE;
    },

    getSign: function (invert) {
        "use strict";
        if (this.direction === CatcherGame.Coin.UP || this.direction === CatcherGame.Coin.LEFT) {
            return invert ? 1 : -1;
        } else {
            return invert ? -1 : 1;
        }
    },

    getAxis: function () {
        "use strict";
        if (this.direction === CatcherGame.Coin.UP || this.direction === CatcherGame.Coin.DOWN) {
            return 'y';
        } else {
            return 'x';
        }
    },

	update: function () {
        "use strict";
        this.sprite[this.getAxis()] += this.speed * this.getSign();
	}
};
