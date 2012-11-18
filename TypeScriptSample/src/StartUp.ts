/// <reference path="Game.ts" />
/// <reference path="IBoard.ts" />
/// <reference path="Starfield.ts" />
/// <reference path="TitleScreen.ts" />
/// <reference path="PlayerShip.ts" />
/// <reference path="EnemyInfo.ts" />
/// <reference path="LevelInfo.ts" />
/// <reference path="Level.ts" />

var titleScreen: TitleScreen;

var straightEnemy = <EnemyInfo>{ name: 'straight', x: 0, y: 50, spriteName: 'enemy_ship', health: 10, B:0, C:0, E: 100 };
var stepEnemy = <EnemyInfo>{ name: 'step', x: 0, y: -50, spriteName: 'enemy_circle', health: 10, B: 150, C: 1.2, E: 75 };

var level1:LevelInfo[] = [
 // Start,   End, Gap,  Type,   Override
  new LevelInfo(0, 4000, 500, stepEnemy),
  new LevelInfo(6000, 13000, 800, straightEnemy),
  new LevelInfo(13000, 20000, 1000, stepEnemy)]

var startGame = () =>{ 
    game.setBoard(4, new Level(level1, () =>{ }, game));
    game.addSprite(new PlayerShip(game));
    
}

var initGame = ()=> {

    titleScreen = new TitleScreen("Network-UA",
                                    "Press fire", 
                                    startGame, 
                                    game.getWidth(), 
                                    game.getHeight(),
                                    game.getControlState());

    game.setBoard(0, new Starfield(document,320,480,20, 0.4, 100, true));
    game.setBoard(1, new Starfield(document,320,480,50, 0.6, 100, false));
    game.setBoard(2, new Starfield(document,320,480,100, 1.0, 50 ,false));
    game.setBoard(3, titleScreen);
};

var looseGame = () =>{ titleScreen.show(); };

var game: Game = new Game("game", initGame,looseGame, document);

game.getSpriteSheet().load({}, () => {})

var ship: SpriteInfo = <SpriteInfo>{ spriteName: 'ship', spriteSheetX: 0, spriteSheetY: 0, width: 37, height: 42, frames: 1 };
var missile: SpriteInfo = <SpriteInfo>{ spriteName: 'missile', spriteSheetX: 0, spriteSheetY: 30, width: 2, height: 10, frames: 1 };
var enemy_purple:SpriteInfo = <SpriteInfo>{ spriteName: 'enemy_purple', spriteSheetX: 37, spriteSheetY: 0, width: 42, height: 43, frames: 1 };
var enemy_bee:SpriteInfo = <SpriteInfo>{ spriteName: 'enemy_bee', spriteSheetX: 79, spriteSheetY: 0, width: 37, height: 43, frames: 1 };
var enemy_ship:SpriteInfo  = <SpriteInfo>{ spriteName: 'enemy_ship', spriteSheetX: 116, spriteSheetY: 0, width: 42, height: 43, frames: 1 };
var enemy_circle:SpriteInfo = <SpriteInfo>{ spriteName: 'enemy_circle', spriteSheetX: 158, spriteSheetY: 0, width: 32, height: 33, frames: 1 };
var explosion: SpriteInfo = <SpriteInfo>{ spriteName: 'explosion', spriteSheetX: 0, spriteSheetY: 64, width: 64, height: 64, frames: 12 };
var enemy_missile: SpriteInfo = <SpriteInfo>{ spriteName: 'enemy_missile', spriteSheetX: 9, spriteSheetY: 42, width: 3, height: 20, frames: 12 };

game.getSpriteSheet().addSpriteInfo(ship);
game.getSpriteSheet().addSpriteInfo(missile);
game.getSpriteSheet().addSpriteInfo(enemy_purple);
game.getSpriteSheet().addSpriteInfo(enemy_bee);
game.getSpriteSheet().addSpriteInfo(enemy_ship);
game.getSpriteSheet().addSpriteInfo(enemy_circle);
game.getSpriteSheet().addSpriteInfo(explosion);
game.getSpriteSheet().addSpriteInfo(enemy_missile);

window.addEventListener("load", ()=>{ game.start() });