/// <reference path="Game.ts" />
/// <reference path="Sprite.ts" />
/// <reference path="ControlState.ts" />
/// <reference path="IBoard.ts" />


class PlayerMissile extends Sprite {
    public damage: number = 10;
    public vy: number = -700;
    private spriteSheet: SpriteSheet;

    constructor (public x: number, public y: number, private game:Game) { 
        super();
        this.spriteSheet = game.getSpriteSheet();
        this.setup('missile', this.spriteSheet);
        this.x = x - this.width / 2;
        this.y = y - this.height;
        this.type = PlayerMissileObject;
    }

    public stepForward(dt: number) { 
        this.y += this.vy * dt;
        if (this.y < -this.height) {
            this.game.removeSprite(this);
        }

        var collision = this.game.collide(this, EnemyObject);

        if (collision) { 
            this.game.removeSprite(this);
            collision.hit(this.damage);
        }
    
    }
}