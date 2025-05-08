/* Api object */
let api;
export { api as default };

/* Set the api object */
export class ApiValidator {
    static setApi(a) {
        if (!api) api = a;
    }
}