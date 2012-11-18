/// <reference path="SpriteSheet.ts" />
/// <reference path="IBoard.ts" />

class Sprite implements IBoard{
    
    private spriteSheet:SpriteSheet;
    
    public spriteName: string;
    public width:number = 0;
    public height:number = 0;
    public spriteSheetX:number = 0;
    public spriteSheetY:number = 0;

    public x:number = 0;
    public y:number = 0;
    public frame:number = 0;
    public type: number = 0;

    public setup(spriteName:string, spriteSheet:SpriteSheet) {
        this.spriteName = spriteName;
        this.spriteSheet = spriteSheet;
        this.frame = this.frame || 0;
        this.width = spriteSheet.GetSpriteWidth(spriteName);
        this.height = spriteSheet.GetSpriteHeight(spriteName);
    }

    public draw(ctx:CanvasRenderingContext2D) {
        this.spriteSheet.draw(ctx, this.spriteName, this.x, this.y, this.frame);
    }

    public stepForward(dt: number) { }

    public hit(damage: number) { }
}