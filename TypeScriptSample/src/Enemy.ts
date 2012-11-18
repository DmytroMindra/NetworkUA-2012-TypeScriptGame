/// <reference path="EnemyInfo.ts" />
/// <reference path="Sprite.ts" />
/// <reference path="Game.ts" />
/// <reference path="IBoard.ts" />
/// <reference path="Explosion.ts" />


class Enemy extends Sprite{

    private A: number=  0;
    private B: number= 0;
    private C: number= 0;
    private D: number= 0;
    private E: number= 0;
    private F: number= 0;
    private G: number= 0;
    private H: number= 0;
    private t: number= 0;
    private vx: number = 0;
    private vy: number = 0;
    private reloadTime: number= 0.75;
    private  reload: number= 0;
    private health: number;


    constructor (blueprint: EnemyInfo, private game:Game) { 
        super();
        this.setup(blueprint.spriteName, game.getSpriteSheet());
        this.x = blueprint.x;
        this.y = blueprint.y;
        this.health = blueprint.health;
        this.E = blueprint.E;
        this.B = blueprint.B;
        this.C = blueprint.C;
        this.type = EnemyObject;
    }

    public stepForward(dt: number) { 
    
        this.t += dt;

    this.vx = this.A + this.B * Math.sin(this.C * this.t + this.D);
    this.vy = this.E + this.F * Math.sin(this.G * this.t + this.H);

    this.x += this.vx * dt;
    this.y += this.vy * dt;

    this.reload -= dt;

    if (this.y > this.game.getHeight() ||
       this.x < -this.width ||
       this.x > this.game.getWidth()) {
        this.game.removeSprite(this);
    }

    
    }

    public hit(damage: number) {
        this.health -= damage;
        if (this.health <= 0) {
            this.game.removeSprite(this);
            this.game.addSprite(new Explosion(this.x + this.width / 2, this.y + this.height / 2, this.game));
        }
    }



}