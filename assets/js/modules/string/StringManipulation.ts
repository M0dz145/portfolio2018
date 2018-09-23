export default class StringManipulation {
    private element: string;

    constructor(string: string = '') {
        this.element = string;
    }

    upperFirst(): StringManipulation {
        this.element = this.element.charAt(0).toUpperCase() + this.element.slice(1);
        return this;
    }

    camelCase(): StringManipulation {
        this.element = this.element.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
            if (+match === 0) {
                return "";
            }
            // or if (/\s+/.test(match)) for white spaces
            return index === 0 ? match.toLowerCase() : match.toUpperCase();
        });

        return this;
    }

    toString(): string {
        return this.element;
    }
}