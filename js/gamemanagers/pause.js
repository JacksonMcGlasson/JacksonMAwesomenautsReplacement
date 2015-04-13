game.SpendGold = Object.extend({
    init: function (x, y, settings) {
        this.now = new Date().getTime();
        this.lastBuy = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
        this.updateWhenPaused = true;
        this.buying = false;
    },
    update: function () {
        this.now = new Date().getTime();
        // console.log(this.now - this.lastBuy);
        if (me.input.isKeyPressed("pause") && ((this.now - this.lastBuy) >= 1000)) {
            console.log("buy screen");
            this.lastBuy = this.now;
            if (!this.buying) {
                console.log("time to buy");
                this.startBuying();
            } else {
                this.stopBuying();
            }
        }
        this.checkBuyKeys();

        return true;
    },
    startBuying: function () {
        console.log("green");
        this.buying = true;
        
        game.data.pausePos = me.game.viewport.localToWorld(0, 0);
        game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage("gold-screen"));
        game.data.buyscreen.updateWhenPaused = true;
        game.data.buyscreen.setOpacity(0.8);
        me.game.world.addChild(game.data.buyscreen, 34);
        game.data.player.body.setVelocity(0, 0);
        me.state.pause(me.state.PLAY);
        me.input.bindKey(me.input.KEY.F1, "F1", true);
        this.setBuyText();


    },
    setBuyText: function () {
        game.data.buytext = new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
                this.font = new me.Font("Arial", 26, "white");
                this.updateWhenPaused = true;
                this.alwaysUpdate = true;
                console.log("red");
            },
            draw: function(renderer){
                console.log(" orange");
                this.font.draw(renderer.getContext(), "PAUSE SCREEN " , this.pos.x, this.pos.y);
               

            }

        }));
        me.game.world.addChild(game.data.buytext, 35);
    },
    stopBuying: function () {
        console.log("blue");
        this.buying = false;
        me.state.resume(me.state.PLAY);
        game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
        me.game.world.removeChild(game.data.buyscreen);
        me.input.unbindKey(me.input.KEY.F1, "F1", true);
       
        me.game.world.removeChild(game.data.buytext);
    },
   
    
});

