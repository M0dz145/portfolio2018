import Translation from "@modules/translation/Translation";

export default class WelcomeConsole {
    private styles: Array<string> = [];
    private message: string = Translation.t('console.welcome') as string;

    constructor() {
        this.styles['font-size'] = '18px';

        this.sayHello();
    }

    /**
     * Get string styles
     */
    private getStyles(): string {
        let styles = ``;
        Object.keys(this.styles).forEach(key => styles += `${key}: ${this.styles[key]};`);

        return styles;
    }

    /**
     * Show message in console
     */
    private sayHello(): void {
        console.log(`%c${this.message}`, this.getStyles());
    }
}
