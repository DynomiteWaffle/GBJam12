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
    cls(14)
    clip(40, 0, 160, 144)
    poke4(2 * 0x3ffc, 4) // set to 2 bpp (4 color mode)
}

var t = 0
var x = 96
var y = 24

function TIC() {
    if (btn(0)) y--
    if (btn(1)) y++
    if (btn(2)) x--
    if (btn(3)) x++

    cls(0)
    spr(1 + ((t % 60) / 30 | 0) * 2, x, y, 14, 3, 0, 0, 2, 2)
    print("HELLO WORLD!", 84, 84,2)
    t++
}
