var CatcherGame = {};

CatcherGame.Boot = function () {
    "use strict";

};

CatcherGame.Boot.prototype = {
    preload: function () {
        "use strict";
        this.load.image('loadingBar', 'img/loadingBar.png');
    },

	create: function () {
        "use strict";
		this.game.input.maxPointers = 1;

		this.game.stage.disableVisibilityChange = true;

	    if (this.game.device.desktop)
	    {
		    this.game.stage.scale.pageAlignHorizontally = true;
	    }
	    else
	    {
		    this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
		    this.game.stage.scale.minWidth = 400;
		    this.game.stage.scale.minHeight = 300;
		    this.game.stage.scale.maxWidth = 800;
		    this.game.stage.scale.maxHeight = 600;
		    this.game.stage.scale.forceLandscape = true;
		    this.game.stage.scale.pageAlignHorizontally = true;
		    this.game.stage.scale.setScreenSize(true);
	    }

        this.game.state.add('Preloader', CatcherGame.Preloader);
        this.game.state.add('Game', CatcherGame.Game);

		this.game.state.start('Preloader');
	}
};
