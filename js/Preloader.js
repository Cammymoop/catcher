CatcherGame.Preloader = function () {
    "use strict";

	this.ready = false;
};

CatcherGame.Preloader.prototype = {
    preload: function () {
        "use strict";
        this.game.load.image('rod', 'img/rod.png');
        this.game.load.image('square', 'img/square.png');
        this.game.load.image('targets', 'img/targets.png');
        this.game.load.image('fullscreen', 'img/full.png');
        this.game.load.image('reset', 'img/reset.png');

        this.game.load.image('test', 'img/test.png');

		this.load.text('testLev', 'data/levels.json');

        /*
        this.game.load.audio('coinSFX', ['sfx/coin.mp3', 'sfx/coin.ogg']);
        this.game.load.audio('hurtSFX', ['sfx/hurt.mp3', 'sfx/hurt.ogg']);

        this.game.load.audio('bgMusic', ['sfx/ludumEdited.mp3', 'sfx/ludumEdited.ogg']);
        */

        this.loadingBar = this.add.sprite(this.world.centerX - 350, this.world.centerY, 'loadingBar');
        this.loadingBar.anchor.setTo(0, 0.5);

        this.load.setPreloadSprite(this.loadingBar);
    },

    create: function () {
        "use strict";
        //this.game.musicMute = false;
        this.loadingBar.visible = false;

        /*
        this.add.sprite(0, 0, 'title');
        this.soundIcon = this.add.sprite(12, 548, 'soundOn');

        this.startButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.muteButton = this.input.keyboard.addKey(Phaser.Keyboard.M);

        this.mutePushed = false;
        this.muteToggle = 0;
        */
    },

    update: function () {
        "use strict";
        /*
        if (!this.mutePushed && this.muteButton.isDown) {
            this.mutePushed = true;
            if (this.sound.mute) {
                this.sound.mute = false;
                this.soundIcon.loadTexture('soundOn');
            } else if (this.game.musicMute) {
                this.sound.mute = true;
                this.game.musicMute = false;
                this.soundIcon.loadTexture('muted');
            } else {
                this.game.musicMute = true;
                this.soundIcon.loadTexture('noMusic');
            }
        }

        if (!this.muteButton.isDown) {
            this.mutePushed = false;
        }
        */

        this.game.state.start('Game');
        /*
        if (this.startButton.isDown) {
            this.game.state.start('Game');
        }
        */
    }
};
