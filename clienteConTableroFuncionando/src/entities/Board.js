export const ELEMENTS = {
    bush : 5,
};
export class Board {
    #map = null;
    #states = {
        NO_BUILD : 0,
        BUILD : 1
    }
    #state = null;

    constructor() {
        this.#state = this.#states.NO_BUILD;
    }

    build(payload) {
        const { size, elements, positions } = payload;
        let preMap = new Array(size).fill().map(() => new Array(size).fill(0));
        elements.forEach(element=> preMap[element.x][element.y]= ELEMENTS.bush);
        this.#state = this.#states.BUILD;
        this.#map = {
            "map":preMap,
            "positions":positions
        }
    }

    get map() {
        if (this.#state === this.#states.BUILD) {
            return this.#map;
        } return undefined;
    }
}