export default class Icon {
    constructor(imageUrl: string) {
        let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        // @ts-ignore
        link.type = 'image/png';
        // @ts-ignore
        link.rel = 'shortcut icon';
        // @ts-ignore
        link.href = imageUrl;

        document.getElementsByTagName('head')[0].appendChild(link);
    }
}