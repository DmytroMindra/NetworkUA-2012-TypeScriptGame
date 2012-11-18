/// <reference path="Game.ts" />
/// <reference path="Enemy.ts" />
/// <reference path="LevelInfo.ts" />
/// <reference path="EnemyInfo.ts" />
/// <reference path="IBoard.ts" />

class Level implements IBoard{

    private t:number = 0;
    private callback;
    public type: number = 0;

    constructor (private levelInfo: LevelInfo[], callback, private game:Game){

        this.callback = callback;
    }

    public stepForward(dt: number) { 
        var idx = 0;
        var remove = [];
        var curShip: LevelInfo = null;
        this.t += dt * 1000;

        while ((curShip = this.levelInfo[idx]) && (curShip.start < this.t + 2000)) {
            if (this.t > curShip.end) {
                remove.push(curShip);
            } else if (curShip.start < this.t) {
            // Get the enemy definition blueprint
            // Add a new enemy with the blueprint and override
                this.game.addSprite(new Enemy(curShip.enemy, this.game));

            // Increment the start time by the gap
            curShip.start += curShip.gap;
           }
         idx++;
       }

        // Remove any objects from the levelData that have passed
        for (var i = 0, len = remove.length; i < len; i++) {
            var remIdx = this.levelInfo.indexOf(remove[i]);
            if (remIdx != -1) this.levelInfo.splice(remIdx, 1);
        }

    }

    public draw(context: CanvasRenderingContext2D) { }

    public hit(damage: number) {}
}