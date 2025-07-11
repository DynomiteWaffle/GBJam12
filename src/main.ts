// title:   Hell's Asteroid
// author:  DynomiteWaffle
// desc:   	made for GB Jam 12
// site:    dynomitewaffle.github.io
// license: GPL3
// version: 0.0
// script:  js
// saveid: GBJam12
// input: gamepad


const normal_button_sequence = 4
const repair_button_sequence = 4
const tunnel_colapse_time = 100
const tunnel_warn_time = tunnel_colapse_time * 0.075

function BOOT() {
    sleep
    cls(14)
    clip(40, 0, 160, 144)
    poke4(2 * 0x3ffc, 4) // set to 2 bpp (4 color mode)
    // sync(32, 1, false)// set to logo colors
}

var t = 0
var x = 30
var y = 24

var d_right_last_pressed = time()
var d_left_last_pressed = time()
var d_up_last_pressed = time()
var d_down_last_pressed = time()

var left_last_pressed = time()
var right_last_pressed = time()
var up_last_pressed = time()
var down_last_pressed = time()


type dir = 0 | 1 | 2 | 3
var facing_dir: dir = 0


var d_last_pressed = time()
var last_pressed = time()

const player_left_limit = x - 3
var player_right_limit = x + 21

var start_time = 0
var end_time = 0

var show_nuke = false

type button = null | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

const tunnel_max_combo = 4

var tunnel_combo = 0

var random_button: button

const button_time = 150

// var scene = boot_animation
var scene = game_scene

function TIC() {
    cls(0)
    scene()
}

function fill_button_pattern(only_dpad: boolean) {
    if (only_dpad) {
        random_button = Math.floor(Math.random() * 4) as button// 4 is d pad only 8 is all
        return
    }
    // fill with all buttons
    random_button = Math.floor(Math.random() * 8) as button// 8 is all
    return
}

function sleep(milliseconds: number) {
    const now = time()
    while (true) {

        if (time() - milliseconds > now) {
            break
        }
    }
}