interface node {

}
const original_tunnel_length = 60
var tunnel = original_tunnel_length
var repair = []
var is_button_sequence = false
var button_sequence_count = 0
var button_next = 2
var failed_button_sequence = false
var nuke_active = false
var arming_nuke = false


function game_scene() {
    if (random_button == null) { fill_button_pattern(true) }
    // trace(random_button)
    // trace(repair[0])
    // trace(x + 9)
    // trace(mget(x + 9, 8))
    //d right
    if (!is_button_sequence && btn(3) && time() > d_last_pressed + button_time) {
        x++
        if (x > player_right_limit + (tunnel - original_tunnel_length)) {
            x--
        }
        d_last_pressed = time()
        facing_dir = 0
    }
    //d left
    if (!is_button_sequence && btn(2) && time() > d_last_pressed + button_time) {
        x--
        if (x < player_left_limit) {
            x++
        }
        d_last_pressed = time()
        facing_dir = 1
    }
    // down - action
    if (!is_button_sequence && btn(4) && time() > last_pressed + button_time) {
        // update nodes
        // nuke
        if (cell() == 1) {
            is_button_sequence = true
            button_sequence_count = nuke_button_sequence
            arming_nuke = true
        }
        // tunnel
        if (cell() == 2) {
            is_button_sequence = true
            button_sequence_count = normal_button_sequence
        }
        // leave
        if (cell() == 3) { leave() }
        // repair
        if (cell() == 18) {
            is_button_sequence = true
            button_sequence_count = repair_button_sequence
        }

        last_pressed = time()
        random_button = null
    }
    // right - exit
    if (btn(5) && time() > last_pressed + button_time) {
        // nuke stuff
        if (arming_nuke && is_button_sequence) {
            arming_nuke = false
        }
        // else
        if (is_button_sequence) {
            is_button_sequence = false
            button_sequence_count = 0
        }
        last_pressed = time()
    }
    // tunnel combo completeion - use mset
    // button combo thingy
    if (is_button_sequence) {
        // display button to click
        var button = 69
        // trace(button_next)
        switch (button_next) {
            case 1:
                button = 4
                break;
            case 2:
                button = 68
                break;
            case 4:
                button = 100
                break;
            case 8:
                button = 36
                break;
        }

        spr(button, 40 + 9 * 8, 40 - 2 + 2 * 8, null)
        // button_sequence_count = 0
        // trace(button_sequence_count)
        if (btnp() != 0) {
            // trace(btnp())
            // trace(button_next)
            if (btnp() != button_next) {
                // trace("no")
            }
        }

        // correct button check
        if (!btn(4) && !btn(5) && !btn(6) && !btn(7) && btn() != 0) {
            if (!btnp(4) && !btnp(5) && !btnp(6) && !btnp(7) && btnp() != 0) {

                if (btn() != button_next) {
                    trace("failed")
                    trace(btn())
                    failed_button_sequence = true
                    is_button_sequence = false
                } else {
                    button_sequence_count--

                    // rand next button == 1 2 4 8
                    switch (Math.floor((Math.random() * 4) + 1)) {
                        case 1:
                            button_next = 1
                            break;
                        case 2:
                            button_next = 2
                            break;
                        case 3:
                            button_next = 4
                            break;
                        case 4:
                            button_next = 8
                            break;
                    }
                }
            }
        }

        // succed
        // new tunnel
        if (button_sequence_count <= 0 && cell() == 2) {
            trace("Tunnel")
            mset(x + 9, 8, 0)//remove tunnel build node
            // remove tunnel front
            mset(tunnel + 1, 8 - 1, 0)
            mset(tunnel + 1, 8, 0)
            mset(tunnel + 1, 8 + 1, 0)

            for (let i = tunnel; i < tunnel + 6; i++) {
                button_sequence_count <= 0
                mset(i, 8 - 2, 98)
                mset(i, 8 + 2, 99)
            }


            // TODO build tunnel
            is_button_sequence = false
            tunnel += 5
            repair[tunnel - 2] = tunnel_warn_time + 1
            // add tunnel front
            mset(tunnel + 1, 8 - 2, 80)
            mset(tunnel + 1, 8 - 1, 64)
            mset(tunnel + 1, 8, 64)
            mset(tunnel + 1, 8 + 1, 64)
            mset(tunnel + 1, 8 + 2, 96)


            // repair tunnel
        } else if (button_sequence_count <= 0 && cell() == 18) {
            trace("repair")
            repair[x + 9] = 0
            is_button_sequence = false
        } else if (button_sequence_count <= 0 && cell() == 1) {
            is_button_sequence = false
            trace("nuke placed")
            nuke_active = true
            mset(x + 9, 8, 33)//set active nuke
        }
    }

    map(x, 0, 20, 17, 40, null, null, 1, remap)
    spr(513, 40 + 9 * 8, 40 + 8 * 3, null, 1, facing_dir);

    // draw tooltip
    if (!is_button_sequence) {
        switch (cell()) {
            case 1: { }
            case 2: { }
            case 3: { }
            case 18: {
                if (repair[x + 9] < tunnel_warn_time) {
                    break;
                }
            }
                spr(69, 40 + 9 * 8, 40 - 2 + 2 * 8, null)
            default: {
            }

        }
    }
    // update tunnel repairs

}


function remap(tile: number, x: number, y: number) {
    // change tiles
    if (tile == 1) {
        // nuke
        if (x == tunnel) {
            return 33
        }
        return 0
    }
    if (tile == 2) {
        // tunnel
        if (x == tunnel) {
            return 16
        }
        return 0
    }
    if (tile == 18) {
        // repair
        if (x > tunnel) {
            return 0
        } else if (repair[x] > tunnel_warn_time) {
            return 32
        } else {
            return 48
        }
        return 0

    }
    if (tile == 3) {
        // leave
        return 48
    }
    return tile
}

function cell() {
    return mget(x + 9, 8)
}

function leave() {
    // TODO change scene appropeutly
}