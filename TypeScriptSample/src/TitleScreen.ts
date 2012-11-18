/// <reference path="Game.ts" />
/// <reference path="IBoard.ts" />
/// <reference path="ControlState.ts" />


class TitleScreen implements IBoard{ 
    
    private up:bool = true;
    public type: number = 0;

    constructor (public title:string, public subtitle:string, private callback, private width:number, private height:number , private controlState:ControlState) { 
    }

    public stepForward(dt: number) {
        // TODO: get rid of global variable & crappy logic && hardcoded value 'fire'
        if (this.up && this.controlState.keys['fire'] && this.callback) {
            this.callback();
            this.hide();
        }
    }
    
    public draw(context: CanvasRenderingContext2D) {
        if (this.up) this.drawTitleBoard(context);
    }

    private drawTitleBoard(context: CanvasRenderingContext2D) {
            context.fillStyle = "#FFFFFF";

            context.font = "bold 40px bangers";
            var measure = context.measureText(this.title);
            context.fillText(this.title, this.width / 2 - measure.width / 2, this.height / 2);

            context.font = "bold 20px bangers";
            var measure2 = context.measureText(this.subtitle);
            context.fillText(this.subtitle, this.width / 2 - measure2.width / 2, this.height / 2 + 40);
    } 

    public show() 
    {
        this.up = true;
    }

    public hide() 
    {
        this.up = false;
    }

    public hit(damage: number) {}




}