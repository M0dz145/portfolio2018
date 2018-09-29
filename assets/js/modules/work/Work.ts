import Uuid from "@modules/generator/Uuid";

export default class Work {
    public id: string;
    public title: string;
    public category: string;
    public description: string;
    public image: object;
    public fullscreen: boolean = false;

    constructor(title: string, category: string, description: string, image: object) {
        this.id = Uuid.generate();
        this.title = title;
        this.category = category;
        this.description = description;
        this.image = image;
    }
}