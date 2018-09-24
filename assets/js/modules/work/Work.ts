export default class Work {
    public id: number;
    public title: string;
    public category: string;
    public description: string;
    public image: object;
    public fullscreen: boolean = false;

    constructor(title: string, category: string, description: string, image: object) {
        this.id = Math.floor(Math.random() * 100000000 + 1);
        this.title = title;
        this.category = category;
        this.description = description;
        this.image = image;
    }
}