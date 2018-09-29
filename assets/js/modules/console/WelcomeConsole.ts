export default class WelcomeConsole {
    private styles: Array<string> = [];
    private message: string = `ヾ(-_- )ゞ I feel that you are a developer...\nIf you have any questions about the creation of this site, you can contact me at the following address webmaster@chevalier-xavier.fr`;

    constructor() {
        this.styles['font-size'] = '18px';

        this.sayHello();
    }

    private getStyles(): string {
        let styles = ``;
        Object.keys(this.styles).forEach((key) => {
            styles += `${key}: ${this.styles[key]};`
        });

        return styles;
    }

    private sayHello(): void {
        console.log(`%c${this.message}`, this.getStyles());
    }
}