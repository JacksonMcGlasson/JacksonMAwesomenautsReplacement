game.MiniMap = me.Entity.extend({
    init: function (x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "minimap",
                width: 439,
                height: 140,
                spritewidth: "439",
                spriteheight: "140",
                getShape: function () {
                    return(new me.Rect(0, 0, 439, 140)).toPolygon();
                }
            }]);
        this.floating = true;
    }
});