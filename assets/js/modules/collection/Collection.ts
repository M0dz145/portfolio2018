export default class Collection extends Array {
    elements: Array<any>;

    constructor(elements: Array<any> = []) {
        super();
        this.elements = elements;
    }

    /**
     * Get all element present in array before the given element
     * @param element
     */
    getAllBefore(element: any): Array<any> {
        const i = this.elements.indexOf(element);

        return i > -1 ? this.elements.slice(0, i) : null;
    }

    /**
     * Remove all element present in array before the given element
     * @param element
     */
    removeAllBefore(element: any): Collection {
        const i = this.elements.indexOf(element);

        if (i > -1) {
            return new Collection(this.elements.slice(i, this.elements.length));
        }

        return this;
    }

    /**
     * Add elements in current array
     * @param elements
     */
    addElements(elements: Array<any>): Collection {
        elements.forEach(element => this.elements.push(element));

        return this;
    }

    /**
     * Flat the current array
     */
    flatten(): Collection {
        const elements = this.elements.reduce((flat, toFlatten) => {
            if (Array.isArray(toFlatten)) {
                return flat.concat(new Collection(toFlatten).flatten().toArray());
            } else {
                if (toFlatten instanceof NodeList || toFlatten instanceof HTMLCollection) {
                    toFlatten = [].slice.call(toFlatten);
                }

                return flat.concat(toFlatten);
            }
        }, []);

        return new Collection(elements);
    }

    /**
     * Get the first element of array
     */
    first(): any {
        return this.elements[0];
    }

    /**
     * Get the last element of array
     */
    last(): any {
        return this.elements[this.elements.length - 1];
    }

    /**
     * Return all element in array
     */
    toArray(): Array<any> {
        return this.elements;
    }
}