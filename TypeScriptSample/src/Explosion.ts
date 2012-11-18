/// <reference path="Game.ts" />

class Explosion extends Sprite{ 
    constructor (public centerX:number, public centerY:number, private game:Game) {
        super();
        this.setup('explosion', game.getSpriteSheet());
        this.x = centerX - this.width / 2;
        this.y = centerY - this.height / 2;
    }

    public step (dt) {
        this.frame++;
        if (this.frame >= 12) {
            this.game.removeSprite(this);
        }
    }
}
