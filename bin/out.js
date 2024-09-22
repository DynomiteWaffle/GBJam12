// title:   Hell's Asteroid
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
var facing_dir = 0;
var d_last_pressed = time();
var last_pressed = time();
const player_left_limit = x - 3;
var player_right_limit = x + 21;
var start_time = 0;
var end_time = 0;
var repairs = [];
repairs[63] = 0;
repairs[68] = 0;
repairs[73] = 0;
repairs[78] = 0;
repairs[83] = 0;
repairs[88] = 0;
repairs[93] = 0;
repairs[98] = 0;
repairs[103] = 0;
repairs[108] = 0;
var tunnel = 60;
var show_nuke = false;
const tunnel_max_combo = 4;
var tunnel_combo = 0;
var random_button;
const button_time = 150;
function boot_animation() {
    // poke4(0x3FF0*2)
    // logos
    map(220, 119, 20, 17, 40);
    if (time() > 1500) {
        scene = menu_scene;
        // vbank(0)
        sync(32, 0, false); // set to game colors
    }
}
function menu_scene() {
    spr(16, 40 + 16, 0, -1, 1, 0, 0, 16, 16);
    map(205, 119, 20, 17, 40);
    if (btn(4)) {
        // start timer/game
        start_time = time();
        scene = game_scene;
    }
}
function game_scene() {
    if (random_button == null) {
        fill_button_pattern(true);
    }
    trace(random_button);
    //d right
    if (btn(3) && time() > d_last_pressed + button_time) {
        x++;
        if (x > player_right_limit) {
            x--;
        }
        d_last_pressed = time();
        facing_dir = 0;
    }
    //d left
    if (btn(2) && time() > d_last_pressed + button_time) {
        x--;
        if (x < player_left_limit) {
            x++;
        }
        d_last_pressed = time();
        facing_dir = 1;
    }
    // down - action
    if (btn(4) && time() > last_pressed + button_time) {
        last_pressed = time();
        random_button = null;
    }
    // right - exit
    if (btn(5) && time() > last_pressed + button_time) {
        last_pressed = time();
    }
    // tunnel combo completeion - use mset
    map(x, 0, 20, 17, 40, null, null, 1, remap);
    spr(513, 40 + 9 * 8, 40 + 8 * 3, null, 1, facing_dir);
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
function fill_button_pattern(only_dpad) {
    if (only_dpad) {
        random_button = Math.floor(Math.random() * 4); // 4 is d pad only 8 is all
        return;
    }
    // fill with all buttons
    random_button = Math.floor(Math.random() * 8); // 8 is all
    return;
}
function remap(tile, x, y) {
    // change tiles
    if (tile == 1) {
        // nuke
        if (show_nuke) {
            return 32;
        }
        return 0;
    }
    if (tile == 2) {
        // tunnel
        if (x == tunnel) {
            return 16;
        }
        return 0;
    }
    if (tile == 18) {
        // repair
        if (repairs[x] > 0) {
            return 32;
        }
        return 0;
    }
    if (tile == 3) {
        // leave
        return 48;
    }
    return tile;
}
function sleep(milliseconds) {
    const now = time();
    while (true) {
        if (time() - milliseconds > now) {
            break;
        }
    }
}
