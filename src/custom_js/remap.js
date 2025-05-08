import api from './api';
export default class Remap {
    /* Some remap wrappers */
    static remap(n, o)
    { Remap.#remap(n, o, api.map, api.unmap); }
    static cremap(n, o)
    { Remap.#remap(n, o, api.cmap, api.unmap); }
    static iremap(n, o)
    { Remap.#remap(n, o, api.imap, api.iunmap); }
    static vremap(n, o)
    { Remap.#remap(n, o, api.vmap, api.vunmap); }

    /* Remap the old key with the new one */
    static #remap(new_key, old_key, f_map, f_unmap) {
        f_map(new_key, old_key);
        f_unmap(old_key);
    };
}