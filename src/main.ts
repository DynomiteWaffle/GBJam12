// title:   GB Jam 12
// author:  DynomiteWaffle
// desc:   	made for GB Jam 12
// site:    dynomitewaffle.github.io
// license: GPL3
// version: 0.0
// script:  js
// saveid: GBJam12
// input: gamepad

function BOOT() {
    sleep
    cls(14)
    clip(40, 0, 160, 144)
    poke4(2 * 0x3ffc, 4) // set to 2 bpp (4 color mode)
    sync(32,1,false)// set to logo colors
}

var t = 0
var x = 30
var y = 24

function boot_animation() {
    // poke4(0x3FF0*2)
    // logos
    map(220, 119, 20, 17, 40)
    if (time() > 3000) {    
        scene = game_scene
        vbank(0)
    }
}
function menu_scene(){}
function game_scene() {
    spr(513, 40 + 9 * 8, 40 + 8 * 3);
    map(x, 0, 20, 17, 40)
    sync(32, 0, false)// set to game colors
}
var scene = boot_animation

function TIC() {
    
    
    if (btn(0)) y--
    if (btn(1)) y++
    if (btn(2)) x--
    if (btn(3)) x++
    
    // spr(1 + ((t % 60) / 30 | 0) * 2, x, y, 14, 3, 0, 0, 2, 2)
    // spr(513, 40 + 9 * 8, 40 + 8 * 3);
    // print("HELLO WORLD!", 84, 84,2)
    t++
    // map(x, 0, 20, 17, 40)
    cls(0)
    scene()
}

function sleep(milliseconds: number) {
    const now = time()
    while (true) {
        
        if(time()-milliseconds>now) {
            break
        }
    }
}