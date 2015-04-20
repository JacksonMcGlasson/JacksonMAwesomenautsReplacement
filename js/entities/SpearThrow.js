game.SpearThrow = me.Entity.extend({
    init: function (x, y, settings, facing) {
        this._super(me.Entity, 'init', [x, y, {
                image: "spear",
                width: 48,
                height: 48,
                spritewidth: "48",
                spriteheight: "48",
                getShape: function () {
                    return(new me.Rect(0, 0, 48, 48)).toPolygon();
                }
            }]);
        this.alwaysUpdate = true;
        this.body.setVelocity(12, 0);
        this.attack = game.data.ability3 * 3;
        this.type = "spear";
        this.facing = facing;
    },
    update: function (delta) {
        //if the player is facing left
        if (this.facing === "left") {
            //than the spear will go left
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        } else {
            //if not it will go right
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        }
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    collideHandler: function (response) {
        //if the spear hits the enemy base or the enemy creep
        if (response.b.type === "EnemyBase" || response.b.type === "EnemyCreep") {
            //the enemy will lose health
            response.b.loseHealth(this.attack);
            //and the spear will disappear
            me.game.world.removeChild(this);
        }
    }
});