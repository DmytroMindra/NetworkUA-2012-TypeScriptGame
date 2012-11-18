class ControlState{ 
    // Extract key codes
    public KEY_CODES = { 37: 'left', 39: 'right', 32: 'fire' };
    
    public keys = {};

    // This function depends on window which is available globally
    public processKeyDown(keycode:number):bool { 
        if (this.KEY_CODES[event.keyCode]) {
            this.keys[this.KEY_CODES[event.keyCode]] = true;
            return true;
        } else return false;
    }

    public processKeyUp(keycode:number) { 
        if (this.KEY_CODES[event.keyCode]) {
            this.keys[this.KEY_CODES[event.keyCode]] = false;
            return true;
        } else return false;
    
    }
}