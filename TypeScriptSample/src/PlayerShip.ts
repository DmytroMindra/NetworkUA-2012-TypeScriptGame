/// <reference path="Game.ts" />
/// <reference path="Sprite.ts" />
/// <reference path="ControlState.ts" />
/// <reference path="PlayerMissile.ts" />
/// <reference path="IBoard.ts" />

class PlayerShip extends Sprite{

    private reloadTime: number = 0.25;
    private reload: number = 0.25;
    private maxVel: number = 200;
    private vx: number = 0;
    private spriteSheet: SpriteSheet;

    private controlState: ControlState;

    constructor (private game:Game) { 
        super();
        this.spriteSheet = game.getSpriteSheet();
        this.controlState = game.getControlState();
        this.setup('ship', this.spriteSheet);
        this.x = game.getWidth()/ 2 - this.width / 2;
        this.y = game.getHeight() - game.playerOffset - this.height;
        this.type = PlayerObject;
    }

    public stepForward (dt) {
        // get rid of hardcoded values 'left' and right
        if (this.controlState.keys['left']) { this.vx = -this.maxVel; }
        else if (this.controlState.keys['right']) { this.vx = this.maxVel; }
        else { this.vx = 0; }

        this.x += this.vx * dt;

        if (this.x < 0) { this.x = 0; }
        else if (this.x > this.game.getWidth() - this.width) {
            this.x = this.game.getWidth() - this.width;
        }

        this.reload -= dt;
        if (this.controlState.keys['fire'] && this.reload < 0) {
            this.controlState.keys['fire'] = false;
            this.reload = this.reloadTime;

            this.game.addSprite(new PlayerMissile(this.x, this.y + this.height / 2, this.game));
            this.game.addSprite(new PlayerMissile(this.x + this.width, this.y + this.height / 2, this.game));
        }
    };

    public hit(damage) {
        if (this.game.removeSprite(this)) {
            this.game.looseGame();
        }
    };


} 
