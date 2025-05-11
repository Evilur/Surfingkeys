class SKYouTube {
    /* The timer to hide the hint DOM object */
    static #timer;

    /* Available rates */
    static #rates = [
        0.05, 0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75,
        2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 10, 12.5, 15
    ];

    /* Get the player object */
    static get #player() { return document.getElementById('movie_player'); }

    /* Get the video object DOM */
    static get #video() {
        return document.querySelector('video.html5-main-video');
    }

    /* Focus to the player */
    static focus() { SKYouTube.#player.focus(); }

    /* Toggle the fullscreen mode */
    static toggleFullscreen() {
        SKYouTube.#player.toggleFullscreen();
    }

    /* Toggle the wide mode */
    static toggleWide() {
        document.querySelector('#movie_player .ytp-size-button').click();
    }

    /* Get the current rate index of #rates array */
    static #getRateIndex(rate) {
        const index = SKYouTube.#rates.indexOf(rate);
        return index === -1 ? 1: index;
    }

    /* Set the playback rate */
    static setRate(rate) {
        SKYouTube.#video.playbackRate = rate;
        SKYouTube.#showHint(`${rate}x`);
    }

    /* Set the best available video quality */
    static setMaxQuality() {
        /* Get the player object */
        const player = SKYouTube.#player;

        /* Get the best playback quality */
        const quality_data = player.getAvailableQualityData()[0];

        /* Set the quality to the player */
        movie_player.setPlaybackQualityRange(quality_data.quality);

        /* Show the hint */
        SKYouTube.#showHint(quality_data.qualityLabel);
    }

    /* Show the hint */
    static #showHint(text) {
        /* Stop the timer */
        clearTimeout(SKYouTube.#timer);       

        /* Get the hint's DOM objects */
        const hint_root = document
            .querySelector('#movie_player .ytp-bezel-text-wrapper').parentNode;
        const hint_text = hint_root.querySelector('.ytp-bezel-text');

        /* Set params to the root hint DOM object */        
        const set_hint_params = (css, cl) => {
            hint_root.style.cssText = css;
            hint_root.className = cl;
        };

        /* Create the trusted type */
        if (!window.trustedTypes.defaultPolicy) {
            window.trustedTypes.createPolicy('default', {
                createHTML: (input) => input
            });
        }

        /* Show the hint */
        hint_text.innerHTML =
            window.trustedTypes.defaultPolicy.createHTML(text);
        set_hint_params('', '');

        /* Set the timer to hide the hint */
        SKYouTube.#timer = setTimeout(() => 
            set_hint_params('display:none', 'ytp-bezel-text-hide'), 750);
    }
}

window.addEventListener('message', event => {
    /* Check for out message */
    if (event.data.target !== 'SK_POST') return;

    /* Get the function and check it */
    const func = SKYouTube[event.data.action];
    if (!func) return;

    /* Execute the function */
    if (event.data.args) func(...event.data.args);
    else func();
});