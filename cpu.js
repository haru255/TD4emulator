class Register {
    constructor() {
        this.reset();
    }
    reset() {
        this.pc = 0;
        this.a = 0;
        this.b = 0;
        this.c = false;
    }
}
class IO {
    constructor() {
        this.input = 0;
        this.output = 0;
    }
}
class Rom {
    constructor() {
        this.rom = new Uint8Array(16);
    }
}

function reset() {
    register.reset();
    this.output = 0;
}
function step() {
    
}

register = new Register();
io = new IO();
rom = new Rom();
