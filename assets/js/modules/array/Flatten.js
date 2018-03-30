export default function flatten(arr) {
    return arr.reduce((flat, toFlatten) => {
        if(Array.isArray(toFlatten)) {
            return flat.concat(flatten(toFlatten));
        } else {
            if(toFlatten instanceof NodeList) {
                toFlatten = [].slice.call(toFlatten);
            } else if(toFlatten instanceof HTMLCollection) {
                toFlatten = [].slice.call(toFlatten);
            }

            return flat.concat(toFlatten);
        }
    }, []);
}