/// <reference path="IBoard.ts" />
/// <reference path="ControlState.ts" />
/// <reference path="SpriteSheet.ts" />
/// <reference path="Sprite.ts" />


class Game { 
    private boards:IBoard[] = [];

    private canvas: HTMLCanvasElement;
    private canvasMultiplier: number;
    private width: number;
    private height: number;
    private ctx: CanvasRenderingContext2D;
    private controlState: ControlState;
    private spriteSheet: SpriteSheet;

    public playerOffset: number = 60;

    lastTime:number = new Date().getTime();
    maxTime:number = 1 / 30;



    constructor (private canvasElementId:string, private startGameCallback, private looseGameCallback, document:Document) { 
        this.controlState = new ControlState();
        this.spriteSheet = new SpriteSheet();
    }

    public start() { 
        this.canvas = <HTMLCanvasElement>document.getElementById(this.canvasElementId);
        this.canvasMultiplier = 1;

        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.ctx = this.canvas.getContext && this.canvas.getContext('2d');
        if (!this.ctx) { return alert("Please upgrade your browser to play"); }

        this.startGameCallback();

        this.setupInput();
        // TODO: Refactor this
        this.loop(new Date().getTime());
    }

    // This function depends on window which is available globally
    private setupInput() {
        var keyDownHandler = (keycode) => { return this.controlState.processKeyDown(keycode) }
        var keyUpHandler = (keycode) => { return this.controlState.processKeyUp(keycode) }

        window.addEventListener('keydown', (e) => {
            // context variable event
            if (keyDownHandler(event.keyCode))
                e.preventDefault();
            
        }, false);

        window.addEventListener('keyup', function (e) {
            // context variable event
            if (keyUpHandler(event.keyCode))
                e.preventDefault();
        }, false);
    };

    // game engine loop
    private loop(curTime:any) {
        requestAnimationFrame((ct) => this.loop(ct));
        var dt = (curTime - this.lastTime) / 1000;
        if (dt > this.maxTime) { dt = this.maxTime; }

        for (var i = 0, len = this.boards.length; i < len; i++) {
            if (this.boards[i]) {
                this.boards[i].stepForward(dt);
                this.boards[i].draw(this.ctx);
            }
        }
        this.lastTime = curTime;
    };

    // Change an active game board
    public setBoard(num, board) { 
        this.boards[num] = board; 
        };


   public getControlState(): ControlState {
        return this.controlState;
    }

   public addSprite(sprite:Sprite) {
       this.boards.push(sprite);
    }

   public removeSprite(sprite:Sprite) {
        var idx = this.boards.indexOf(sprite);
        if (idx != -1) {
            this.boards.splice(idx, 1);
        }
   }

   public looseGame() { 
    this.looseGameCallback()
   }

   public getSpriteSheet() { return this.spriteSheet; }


    public getWidth(): number { return this.width; }
    public getHeight(): number { return this.height; }


    public overlap(o1, o2) {
        var vertical = (o1.y + o1.height - 1 < o2.y) || (o1.y > o2.y + o2.height - 1);
        var horizontal = (o1.x + o1.width - 1 < o2.x) || (o1.x > o2.x + o2.width - 1);
        var result = !(vertical || horizontal);
        return result;
    };

    public collide(obj1, type) {
        for (var i = 0, val = null, len = this.boards.length; i < len; i++) { 
            var obj2 = this.boards[i];
            if ((obj1 != obj2) && (obj2.type == type) && this.overlap(obj1, obj2)) return obj2;
        }
        return null;
    };



}
