game.Pause = Object.extend({
    init: function (x, y, settings) {
        this.now = new Date().getTime();
        this.lastPause = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
        this.updateWhenPaused = true;
        this.pausing = false;
    },
    update: function () {
        this.now = new Date().getTime();
        // console.log(this.now - this.lastBuy);
        if (me.input.isKeyPressed("pause") && ((this.now - this.lastPause) >= 500)) {
            console.log("buy screen");
            this.lastPause = this.now;
            if (!this.pausing) {
                console.log("time to buy");
                this.pause();
            } else {
                this.resume();
            }
        }
        return true;
    },
    pause: function () {
       
        this.pausing = true;
        
        game.data.pausePos = me.game.viewport.localToWorld(0, 0);
        game.data.pausescreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage("gold-screen"));
        game.data.pausescreen.updateWhenPaused = true;
        game.data.pausescreen.setOpacity(0.8);
        me.game.world.addChild(game.data.pausescreen, 34);
        game.data.player.body.setVelocity(0, 0);
        me.state.pause(me.state.PLAY);
        me.input.bindKey(me.input.KEY.F1, "F1", true);
        this.setPauseText();


    },
    setPauseText: function () {
        game.data.pausetext = new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
                this.font = new me.Font("Arial", 26, "white");
                this.updateWhenPaused = true;
                this.alwaysUpdate = true;
               
            },
            draw: function(renderer){
               
                this.font.draw(renderer.getContext(), "PAUSE SCREEN " , this.pos.x, this.pos.y);
               

            }

        }));
        me.game.world.addChild(game.data.buytext, 35);
    },
    resume: function () {
        console.log("blue");
        this.pausing = false;
        me.state.resume(me.state.PLAY);
        game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
        me.game.world.removeChild(game.data.buyscreen);
        me.input.unbindKey(me.input.KEY.F1, "F1", true);
       
        me.game.world.removeChild(game.data.pausetext);
    },
   
    
});

