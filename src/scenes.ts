function boot_animation() {
    // poke4(0x3FF0*2)
    // logos
    map(220, 119, 20, 17, 40)
    if (time() > 1500) {
        scene = menu_scene
        vbank(0)
        sync(32, 0, false)// set to game colors
    }
}
function menu_scene() {
    spr(16, 40 + 16, 0, -1, 1, 0, 0, 16, 16)
    map(205, 119, 20, 17, 40)

    if (btn(4)) {
        // start timer/game
        start_time = time()

        scene = game_scene

    }
}
