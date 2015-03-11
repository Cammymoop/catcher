    /*
     * Automatically Included properties:
     * this.game;		//	a reference to the currently running game
     * this.add;		//	used to add sprites, text, groups, etc
     * this.camera;	//	a reference to the game camera
     * this.cache;		//	the game cache
     * this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
     * this.load;		//	for preloading assets
     * this.math;		//	lots of useful common math operations
     * this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
     * this.stage;		//	the game stage
     * this.time;		//	the clock
     * this.tweens;	//	the tween manager
     * this.world;		//	the game world
     * this.particles;	//	the particle manager
     * this.physics;	//	the physics manager
     * this.rnd;		//	the repeatable random number generator
     */
CatcherGame.Game = function () {
    "use strict";
};

CatcherGame.Game.prototype = {
	create: function () {
        "use strict";
        this.DEBUG_MODE = true;
        this.stage.backgroundColor = '#222222';
        //this.add.sprite(0, 0, 'background');
        this.worldCenter = new Phaser.Point(this.world.centerX, this.world.centerY);
        this.world.setBounds(-this.world.centerX,  -this.world.centerY, this.world.width*2, this.world.height*2);

        this.hotspots = {};
		this.hotspots['n'] = new CatcherGame.HotSpot(this.worldCenter.x, this.worldCenter.y - 100, 0);
		this.hotspots['e'] = new CatcherGame.HotSpot(this.worldCenter.x + 100, this.worldCenter.y, 90);
		this.hotspots['s'] = new CatcherGame.HotSpot(this.worldCenter.x, this.worldCenter.y + 100, 180);
		this.hotspots['w'] = new CatcherGame.HotSpot(this.worldCenter.x - 100, this.worldCenter.y, 270);
        this.hotspots.getByAngle = function (angle) {
            var dir = CatcherGame.angleToDir(angle);
            if (!this[dir]) {
                console.log('No hotsot!');
            }
            return this[dir];
        };

        this.add.sprite(this.worldCenter.x, this.worldCenter.y, 'targets').anchor.setTo(0.5, 0.5);
        this.rod = this.game.add.sprite(this.worldCenter.x, this.worldCenter.y, 'rod');
        this.rod.anchor.setTo(0.5, 0.8591);
        this.rod.turning = false;
        this.rod.targetAngle = 0;
        this.rod.doneTurning = function () {
            this.turning = false;
        };

        /*
        this.add.sprite(0, 0, 'test');
        this.add.sprite(this.worldCenter.x, this.worldCenter.y, 'test');
        this.add.sprite(this.camera.view.width - 40, this.camera.view.height - 40, 'test');
        */

        this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.forceLandscape = true;
        this.fsButton = this.add.button(0, 0, 'fullscreen', this.fullButtonPress, this);
        this.fsButton.fixedToCamera = true;
        this.restartButton = this.add.button(980, 0, 'reset', this.reset, this);
        this.restartButton.fixedToCamera = true;
        this.restartButton.anchor.setTo(1, 0);
        //this.cameraZoom(0.8);

        this.game.scale.enterFullScreen.add(this.enterFullScreen, this);
        this.game.scale.leaveFullScreen.add(this.leaveFullScreen, this);

        this.score = 0;
        this.scoreDisplay = this.add.text(60, 8, 'Score: 0', {font: "18pt Sans", fill: "#DDDDDD"});

		this.testLevData = JSON.parse(this.cache.getText('testLev'));

        this.coins = [];
        //this.coins.push(new CatcherGame.Coin(this.add, this.hotspots['s'], 20, CatcherGame.Coin.UP));
        this.levTime = 0;
        this.startLev(this.testLevData.sets[0]);

        this.keys = {
            'Left': this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            'Right': this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            'R': this.input.keyboard.addKey(Phaser.Keyboard.R)
        };
	},

    startLev: function (data) {
        "use strict";
        this.maxScore = data['total'];
        this.levOffset = 0;

        data.coins.forEach(this.queueCoin, this);
    },

    queueCoin: function (coinData) {
        "use strict";
        this.levOffset += coinData.delay;

        this.time.events.add(Phaser.Timer.SECOND * this.levOffset, this.addCoin, this, coinData); 
    },

    addCoin: function (coinData) {
        "use strict";
        this.coins.push(new CatcherGame.Coin(this.add, this.hotspots[coinData.target], 20, coinData.dir)); 
    },

    enterFullScreen: function () {
        "use strict";
        this.fsButton.visible = false;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    leaveFullScreen: function () {
        "use strict";
        this.fsButton.visible = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    },

	update: function () {
        "use strict";
        /*
        if (!this.mutePushed && this.keys.M.isDown) {
            this.mutePushed = true;
            if (this.sound.mute) {
                this.sound.mute = false;
                this.soundIcon.loadTexture('soundOn');
            } else if (this.game.musicMute) {
                this.sound.mute = true;
                this.music.volume = 0.8;
                this.game.musicMute = false;
                this.soundIcon.loadTexture('muted');
            } else {
                this.music.volume = 0;
                this.game.musicMute = true;
                this.soundIcon.loadTexture('noMusic');
            }
        }

        if (!this.keys.M.isDown) {
            this.mutePushed = false;
        }
        */
        var rod = this.rod;

        var turning = {'left': false, 'right': false};
		if (this.input.activePointer.isDown)
		{
			if (this.input.activePointer.x < this.worldCenter.x)
			{
                turning.left = true;
			}
			else
			{
                turning.right = true;
			}
		}
        if (this.keys.Left.isDown) {
            turning.left = true;
        }
        if (this.keys.Right.isDown) {
            turning.right = true;
        }

        if (!rod.turning) {
            this.grabCoins(this.hotspots.getByAngle(rod.angle));
            var tween = null;
            rod.targetAngle = rod.angle;
            if (turning.left && !turning.right) {
                if (rod.angle === -180)
                {
                    rod.targetAngle = 180;
                    rod.angle = 179.99; //don't question it, it works
                }
                rod.targetAngle = rod.targetAngle - 90;

                tween = this.add.tween(rod).to({angle: rod.targetAngle}, 200, Phaser.Easing.Cubic.InOut, true);
                tween.onComplete.add(rod.doneTurning, rod);

                rod.turning = true;
            }
            if (turning.right && !turning.left) {
                if (rod.angle === 180)
                {
                    rod.targetAngle = -180;
                    rod.angle = -180;
                }
                rod.targetAngle = rod.targetAngle + 90;

                tween = this.add.tween(rod).to({angle: rod.targetAngle}, 200, Phaser.Easing.Cubic.InOut, true);
                tween.onComplete.add(rod.doneTurning, rod);

                rod.turning = true;
            }
        }

        if (this.keys.R.isDown) {
            this.reset();
        }

        this.coins.forEach(function(coin) { coin.update(); if (coin.collected) { this.score++; } }, this);

        this.scoreDisplay.setText('Score: ' + this.score);
        this.coins = this.coins.filter(function (coin) { return coin.isAlive(); });
	},

    grabCoins: function (hotspot) {
        "use strict";
        this.coins.forEach(function (coin) { coin.collect(hotspot.getPosition()); });
    },

    fullButtonPress: function () {
        "use strict";
        this.scale.startFullScreen();
    },

    reset: function () {
        "use strict";
        //this.music.stop();
        this.world.setBounds(0, 0, this.worldCenter.x*2, this.worldCenter.y*2);
        this.game.state.start('Game');
    },

    gameOver: function () {
        "use strict";
        this.gameOverText.visible = true;
    }
};

CatcherGame.HotSpot = function (x, y, angle)
{
    "use strict";
    this.x = x;
    this.y = y;
    this.angle = angle;

    this.getPosition = function () {
        return new Phaser.Point(this.x, this.y);
    };
};

CatcherGame.dirToAngle = function (dir) {
    "use strict";
    dir = dir.toUpperCase();
    if (dir === 'N' || dir === 'NORTH') {
        return 0;
    } else if (dir === 'S' || dir === 'SOUTH') {
        return 180;
    } else if (dir === 'E' || dir === 'EAST') {
        return 90;
    } else if (dir === 'W' || dir === 'WEST') {
        return 270;
    }
};

CatcherGame.normalizeAngle = function (angle) {
    var neg = false;
    if (angle < 0) {
        neg = true;
        angle = -angle;
    }
    if (angle >= 360) {
        angle = angle % 360;
    }
    return (neg ?  360 - angle : angle);
};

CatcherGame.angleToDir = function (angle) {
    "use strict";
    angle = CatcherGame.normalizeAngle(angle);
    if (angle === 0) {
        return 'n';
    } else if (angle === 90) {
        return 'e';
    } else if (angle === 180) {
        return 's';
    } else if (angle === 270) {
        return 'w';
    } else {
        console.log('Bad angle!');
        return 'n';
    }
};
