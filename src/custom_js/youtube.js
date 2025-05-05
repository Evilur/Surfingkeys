export default class YouTube {
    /* The fullscreen button DOM object */
    static #fs_button;

    /* The hint root DOM object */
    static #hint_root;

    /* The hint text DOM object */
    static #hint_text;

    /* The timer to hide the hint DOM object */
    static #timer;

    /* The video player DOM object */
    static #player;

    /* Available rates */
    static #RATES = [ 0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75,
                      2, 2.25, 2.5, 3, 3.5, 4, 5, 6, 8, 10, 15 ];

    /* The index of the current playback rate */
    static #index = 4;

    /* Enter/exit the fullscreen mode */
    static enterFullscreen() {
        if (!YouTube.#fs_button) YouTube.#fs_button =
            document.querySelector('#movie_player .ytp-fullscreen-button');
        YouTube.#fs_button.click();
    }

    /* Reset the playback rate */
    static resetRate() {
        YouTube.#index = 4;
        YouTube.#setRate(1);
    }

    /* Set the playback rate to 2x */
    static set2xRate() {
        YouTube.#index = 8;
        YouTube.#setRate(2);
    }

    /* Increase the playback rate */
    static increaseRate() {
        /* Check for out of index */
        if (--YouTube.#index < 0) YouTube.#index = 0;
        YouTube.#setRate(YouTube.#RATES[YouTube.#index]);
    }

    /* Decrease the playback rate */
    static decreaseRate() {
        /* Check for out of index */
        if (++YouTube.#index >= 19) YouTube.#index = 18;
        YouTube.#setRate(YouTube.#RATES[YouTube.#index]);
    }

    /* Set the playback rate */
    static #setRate(rate) {
        /* Stop the timer */
        clearTimeout(YouTube.#timer);

        /* Set the playback rate */
        if (!YouTube.#player) YouTube.#player = document
            .querySelector('video.html5-main-video');
        YouTube.#player.playbackRate = rate;
        
        /* Get the hint's DOM objects */
        if (!YouTube.#hint_root) YouTube.#hint_root = document
                .querySelector('#movie_player .ytp-bezel-text-wrapper')
                .parentNode;
        if (!YouTube.#hint_text) YouTube.#hint_text =
            YouTube.#hint_root.querySelector('.ytp-bezel-text');

        /* Set params to the root hint DOM object */        
        const set_hint_params = (css, cl) => {
            YouTube.#hint_root.style.cssText = css;
            YouTube.#hint_root.className = cl;
        };

        /* Show the hint */
        YouTube.#hint_text.innerHTML = `${rate}x`;
        set_hint_params('', '');

        /* Set the timer to hide the hint */
        YouTube.#timer = setTimeout(() => 
            set_hint_params('display:none', 'ytp-bezel-text-hide'), 750);
    }
}