// TODO 
/// <reference path="SpriteInfo.ts" />

class SpriteSheet {
    private map: {};
    private image: HTMLImageElement;

    // TODO  add type data to parameters
    public load(spriteData, callback) {
        this.map = spriteData;
        this.image = new Image();
        this.image.onload = callback;
        // TODO: Get rid of hardcoded values
        this.image.src = 'images/sprites.png';
    };

    public draw(ctx, spriteName, x, y, frame) {
        var sprite:SpriteInfo = this.map[spriteName];
        if (!frame) frame = 0;
        var spriteSheetXPosition: number = sprite.spriteSheetX + frame * sprite.width;

        ctx.drawImage(this.image,
                         spriteSheetXPosition,
                         sprite.spriteSheetY,
                         sprite.width,
                         sprite.height,
                         Math.floor(x),
                         Math.floor(y),
                         sprite.width,
                         sprite.height);
    }

    public GetSpriteWidth(spriteName: string): number {
        var sprite:Sprite = this.map[spriteName];
        return sprite.width;
    }

    public GetSpriteHeight(spriteName: string): number {
        var sprite:Sprite = this.map[spriteName];
        return sprite.height;
    }

    public addSpriteInfo(spriteInfo:SpriteInfo) { 
        this.map[spriteInfo.spriteName] = spriteInfo;
    }

}