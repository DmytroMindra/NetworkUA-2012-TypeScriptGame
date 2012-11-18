var PlayerObject = 1, EnemyObject =2, PlayerMissileObject=4;


interface IBoard { 
        stepForward(dt: number);
        draw(context: CanvasRenderingContext2D);
        type: number;
        hit(damage:number);
}