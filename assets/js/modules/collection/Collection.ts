export default class Collection {
    elements: Array<any>;

    constructor(elements: Array<any> = []) {
        this.elements = elements;
    }

    flatten(): Collection {
        const elements = this.elements.reduce((flat, toFlatten) => {
            if(Array.isArray(toFlatten)) {
                return flat.concat(new Collection(toFlatten).flatten().toArray());
            } else {
                if(toFlatten instanceof NodeList || toFlatten instanceof HTMLCollection) {
                    toFlatten = [].slice.call(toFlatten);
                }

                return flat.concat(toFlatten);
            }
        }, []);

        return new Collection(elements);
    }

    last(): any {
        return this.elements[this.elements.length - 1];
    }

    toArray(): Array<any> {
        return this.elements;
    }
}