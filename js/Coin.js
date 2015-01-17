CatcherGame.Coin = function (factory, target, speed, direction) {
    "use strict";
    this.speed = speed;
    this.direction = direction;
    this.angle = direction;

    this.sprite = factory.sprite(target.x, target.y, 'square');
};

CatcherGame.Coin.UP = 0;
CatcherGame.Coin.DOWN = 180;
CatcherGame.Coin.LEFT = 270;
CatcherGame.Coin.RIGHT = 90;
CatcherGame.Coin.OFFSCREEN_DISTANCE = 600;

CatcherGame.Coin.prototype = {
    moveBack: function () {
        "use strict";
        var axis = null;
        var sign = null;
        if (this.direction === this.UP || this.direction === this.DOWN) {
            axis = 'y';
            sign = this.direction === this.UP ? 1 : -1;
        } else {
            axis = 'x';
            sign = this.direction === this.LEFT ? 1 : -1;
        }

        this.sprite[axis] += sign * this.OFFSCREEN_DISTANCE;
    },

	update: function () {
        "use strict";
	}
};
