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
    sleep;
    cls(14);
    clip(40, 0, 160, 144);
    poke4(2 * 0x3ffc, 4); // set to 2 bpp (4 color mode)
    sync(32, 1, false); // set to logo colors
}
var t = 0;
var x = 30;
var y = 24;
var d_right_last_pressed = time();
var d_left_last_pressed = time();
var d_up_last_pressed = time();
var d_down_last_pressed = time();
var left_last_pressed = time();
var right_last_pressed = time();
var up_last_pressed = time();
var down_last_pressed = time();
var d_last_pressed = time();
var last_pressed = time();
const player_left_limit = x - 3;
var player_right_limit = x + 21;
var start_time = 0;
var end_time = 0;
const button_time = 150;
function boot_animation() {
    // poke4(0x3FF0*2)
    // logos
    map(220, 119, 20, 17, 40);
    if (time() > 3000) {
        scene = game_scene;
        // vbank(0)
        sync(32, 0, false); // set to game colors
    }
}
function menu_scene() {
    // start timer/game
    start_time = time();
}
function game_scene() {
    //d right
    if (btn(3) && time() > d_last_pressed + button_time) {
        x++;
        if (x > player_right_limit) {
            x--;
        }
        d_last_pressed = time();
    }
    //d left
    if (btn(2) && time() > d_last_pressed + button_time) {
        x--;
        if (x < player_left_limit) {
            x++;
        }
        d_last_pressed = time();
    }
    // down - action
    if (btn(4) && time() > last_pressed + button_time) {
        last_pressed = time();
    }
    // right - exit
    if (btn(5) && time() > last_pressed + button_time) {
        last_pressed = time();
    }
    map(x, 0, 20, 17, 40);
    spr(513, 40 + 9 * 8, 40 + 8 * 3);
}
function nuke_scene() { }
// cinematic
function intro_story_scene() { }
// good ending
function nuke_explode_scene() { }
// weak endings
function nuke_misfire_scene() { }
function die_scene() { }
// coward ending
function leave_scene() { }
var scene = boot_animation;
function TIC() {
    // if (btn(0)) y--
    // if (btn(1)) y++
    // spr(1 + ((t % 60) / 30 | 0) * 2, x, y, 14, 3, 0, 0, 2, 2)
    // spr(513, 40 + 9 * 8, 40 + 8 * 3);
    // print("HELLO WORLD!", 84, 84,2)
    // t++
    // map(x, 0, 20, 17, 40)
    cls(0);
    scene();
}
function sleep(milliseconds) {
    const now = time();
    while (true) {
        if (time() - milliseconds > now) {
            break;
        }
    }
}
