export default class Icon {
    constructor(imageUrl: string) {
        let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
        link.type = 'image/png';
        link.rel = 'shortcut icon';
        link.href = imageUrl;

        document.getElementsByTagName('head')[0].appendChild(link);
    }
}
