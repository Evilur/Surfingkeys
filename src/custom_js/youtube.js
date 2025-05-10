export default class YouTube {
    /* The timer to hide the hint DOM object */
    #timer;

    /* Available rates */
    #rates = [ 0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75,
               2, 2.25, 2.5, 3, 3.5, 4, 5, 6, 8, 10, 15];

    /* The index of the current playback rate */
    #index = this.#rates.indexOf(1);

    /* Enter/exit the fullscreen mode */
    enterFullscreen() {
        document.querySelector('#movie_player .ytp-fullscreen-button').click();
    }

    /* Set the playback rate to the value */
    setRate(rate) {
        /* Get the index of such a rate value */
        const index = this.#rates.indexOf(rate);
        if (index == -1) return;

        /* Of all is OK, set the playback rate */
        this.#index = index;
        this.#setRate(rate);
    }

    /* Increase the playback rate */
    increaseRate() {
        /* Check for out of index */
        if (--this.#index < 0) this.#index = 0;
        this.#setRate(this.#rates[this.#index]);
    }

    /* Decrease the playback rate */
    decreaseRate() {
        /* Check for out of index */
        if (++this.#index >= this.#rates.length) this.#index =
            this.#rates.length - 1;
        this.#setRate(this.#rates[this.#index]);
    }

    /* Set the playback rate */
    #setRate(rate) {
        /* Stop the timer */
        clearTimeout(this.#timer);

        /* Set the playback rate */
        document.querySelector('video.html5-main-video').playbackRate = rate;
        
        /* Get the hint's DOM objects */
        const hint_root = document
            .querySelector('#movie_player .ytp-bezel-text-wrapper')
            .parentNode;
        const hint_text = hint_root.querySelector('.ytp-bezel-text');

        /* Set params to the root hint DOM object */        
        const set_hint_params = (css, cl) => {
            hint_root.style.cssText = css;
            hint_root.className = cl;
        };

        /* Show the hint */
        hint_text.innerHTML = `${rate}x`;
        set_hint_params('', '');

        /* Set the timer to hide the hint */
        this.#timer = setTimeout(() => 
            set_hint_params('display:none', 'ytp-bezel-text-hide'), 750);
    }
}