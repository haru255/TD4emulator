"use strict";
class Register {
    #pc = 0;
    #a = 0;
    #b = 0;
    #c = false;

    constructor() {
        this.reset();
    }
    reset() {
        this.#pc = 0;
        this.#a = 0;
        this.#b = 0;
        this.#c = false;
    }
    get_pc() {return this.#pc;}
    set_pc(val) {
        this.#pc = val & 0xF;
    }
    get_a() {return this.#a;}
    set_a(val) {
        this.#a = val & 0xF;
    }
    get_b() {return this.#b;}
    set_b(val) {
        this.#b = val & 0xF;
    }
    get_c() {return this.#c};
    set_c(val) {
        this.#c = val;
    }
}

class IO {
    constructor() {
        this.input = 0;
        this.output = 0;
    }
    get_input() {return this.input};
    set_output(val) {this.output = val};
}

class Rom {
    constructor() {
        this.rom = new Uint8Array(16);
    }
}




const opcode = [add_a, mov_ab, in_a, mov_a,
                mov_ba, add_b, in_b, mov_b,
                nop, out_b, nop, out,
                nop, nop, jnc, jmp];

function reset() {
    register.reset();
    this.output = 0;
}
//pcが指す番地のデータを受け取る
function fetch() {
    let res = rom.rom[register.pc];
    register.pc ++;
    return res;
}
function step() {
    let data = fetch();
    let op = data >> 4;
    let im = data & 0x0F;
    opcode[op](im);
}

const register = new Register();
const io = new IO();
const rom = new Rom();

step();

// 以下命令セット
function mov_a(im) {
    register.set_a(im);
    register.set_c(false);
}
function mov_b(im) {
    register.set_b(im);
    register.set_c(false);
}
function mov_ab(im) {
    register.set_a(register.get_b());
    register.set_c(false);
}
function mov_ba(im) {
    register.set_b(register.get_a());
    register.set_c(false);
}
function add_a(im) {
    let old = register.get_a();
    register.set_a(register.get_a() + im);
    let now = register.get_a();
    register.set_c(old > now);
}
function add_b(im) {
    let old = register.get_b();
    register.set_b(register.get_b() + im);
    let now = register.get_b();
    register.set_c(old > now);
}
function in_a(im) {
    register.set_a(io.get_input());
    register.set_c(false);
}
function in_b(im) {
    register.set_b(io.get_input());
    register.set_c(false);
}
function out(im) {
    io.set_output(im);
    register.set_c(false);
}
function out_b(im) {
    io.set_output(register.get_b());
    register.set_c(false);
}
function jmp(im) {
    register.set_pc(im);
    register.set_c(false);
}
function jnc(im) {
    if (!register.get_c()) register.set_pc(im);
    register.set_c(false);
}
function nop(im) {}