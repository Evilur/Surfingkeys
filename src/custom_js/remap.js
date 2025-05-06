export default class Remap {
    /* The api object to get map/unmap functions */
    static #api;

    /* Set the api object */
    static init(api) { Remap.#api = api; }

    /* Some remap wrappers */
    static remap(n, o)
    { Remap.#remap(n, o, Remap.#api.map, Remap.#api.unmap); }
    static cremap(n, o)
    { Remap.#remap(n, o, Remap.#api.cmap, Remap.#api.unmap); }
    static iremap(n, o)
    { Remap.#remap(n, o, Remap.#api.imap, Remap.#api.iunmap); }
    static vremap(n, o)
    { Remap.#remap(n, o, Remap.#api.vmap, Remap.#api.vunmap); }

    /* Remap the old key with the new one */
    static #remap(new_key, old_key, f_map, f_unmap) {
        f_map(new_key, old_key);
        f_unmap(old_key);
    };
}