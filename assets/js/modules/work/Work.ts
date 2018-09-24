export default class Work {
    public id: number;
    public title: string;
    public category: string;
    public description: string;
    public image: object;
    public fullscreen: boolean = false;

    constructor(id: number, title: string, category: string, description: string, image: object) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.description = description;
        this.image = image;
    }
}