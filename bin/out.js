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
const original_tunnel_length = 60;
var tunnel = original_tunnel_length;
var repair = [];
var is_button_sequence = false;
var button_sequence_count = 0;
function game_scene() {
    if (random_button == null) {
        fill_button_pattern(true);
    }
    // trace(random_button)
    trace(repair[0]);
    trace(x + 9);
    trace(mget(x + 9, 8));
    //d right
    if (!is_button_sequence && btn(3) && time() > d_last_pressed + button_time) {
        x++;
        if (x > player_right_limit + (tunnel - original_tunnel_length)) {
            x--;
        }
        d_last_pressed = time();
        facing_dir = 0;
    }
    //d left
    if (!is_button_sequence && btn(2) && time() > d_last_pressed + button_time) {
        x--;
        if (x < player_left_limit) {
            x++;
        }
        d_last_pressed = time();
        facing_dir = 1;
    }
    // down - action
    if (!is_button_sequence && btn(4) && time() > last_pressed + button_time) {
        // update nodes
        // tunnel
        if (cell() == 2) {
            is_button_sequence = true;
            button_sequence_count = normal_button_sequence;
        }
        // leave
        if (cell() == 3) {
            leave();
        }
        // repair
        if (cell() == 18) {
            is_button_sequence = true;
            button_sequence_count = repair_button_sequence;
        }
        last_pressed = time();
        random_button = null;
    }
    // right - exit
    if (btn(5) && time() > last_pressed + button_time) {
        if (is_button_sequence) {
            is_button_sequence = false;
            button_sequence_count = 0;
        }
        last_pressed = time();
    }
    // tunnel combo completeion - use mset
    // button combo thingy
    if (is_button_sequence) {
        button_sequence_count = 0;
        // succed
        // new tunnel
        if (button_sequence_count >= 0 && x + 9 == tunnel) {
            mset(x + 9, 8, 0); //remove tunnel build node
            // remove tunnel front
            mset(tunnel + 1, 8 - 1, 0);
            mset(tunnel + 1, 8, 0);
            mset(tunnel + 1, 8 + 1, 0);
            for (let i = tunnel; i < tunnel + 6; i++) {
                mset(i, 8 - 2, 98);
                mset(i, 8 + 2, 99);
            }
            // TODO build tunnel
            is_button_sequence = false;
            tunnel += 5;
            repair[tunnel - 2] = tunnel_warn_time + 1;
            // add tunnel front
            mset(tunnel + 1, 8 - 2, 80);
            mset(tunnel + 1, 8 - 1, 64);
            mset(tunnel + 1, 8, 64);
            mset(tunnel + 1, 8 + 1, 64);
            mset(tunnel + 1, 8 + 2, 96);
            // repair tunnel
        }
        else if (button_sequence_count >= 0) {
            repair[x + 9] = 0;
            is_button_sequence = false;
        }
    }
    map(x, 0, 20, 17, 40, null, null, 1, remap);
    spr(513, 40 + 9 * 8, 40 + 8 * 3, null, 1, facing_dir);
    // draw tooltip
    if (!is_button_sequence) {
        switch (cell()) {
            case 1: { }
            case 2: { }
            case 3: { }
            case 18:
                {
                    if (repair[x + 9] < tunnel_warn_time) {
                        break;
                    }
                }
                spr(68, 40 + 9 * 8, 40 - 2 + 2 * 8, null);
            default: {
            }
        }
    }
    // update tunnel repairs
}
function remap(tile, x, y) {
    // change tiles
    if (tile == 1) {
        // nuke
        if (x == tunnel) {
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
        if (x > tunnel) {
            return 0;
        }
        else if (repair[x] > tunnel_warn_time) {
            return 32;
        }
        else {
            return 48;
        }
        return 0;
    }
    if (tile == 3) {
        // leave
        return 48;
    }
    return tile;
}
function cell() {
    return mget(x + 9, 8);
}
function leave() {
    // TODO change scene appropeutly
}
// title:   Hell's Asteroid
// author:  DynomiteWaffle
// desc:   	made for GB Jam 12
// site:    dynomitewaffle.github.io
// license: GPL3
// version: 0.0
// script:  js
// saveid: GBJam12
// input: gamepad
const normal_button_sequence = 4;
const repair_button_sequence = 4;
const tunnel_colapse_time = 100;
const tunnel_warn_time = tunnel_colapse_time * 0.075;
function BOOT() {
    sleep;
    cls(14);
    clip(40, 0, 160, 144);
    poke4(2 * 0x3ffc, 4); // set to 2 bpp (4 color mode)
    // sync(32, 1, false)// set to logo colors
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
var show_nuke = false;
const tunnel_max_combo = 4;
var tunnel_combo = 0;
var random_button;
const button_time = 150;
// var scene = boot_animation
var scene = game_scene;
function TIC() {
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
function sleep(milliseconds) {
    const now = time();
    while (true) {
        if (time() - milliseconds > now) {
            break;
        }
    }
}
function boot_animation() {
    // poke4(0x3FF0*2)
    // logos
    map(220, 119, 20, 17, 40);
    if (time() > 1500) {
        scene = menu_scene;
        vbank(0);
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
