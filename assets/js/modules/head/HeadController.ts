import Translation from "@modules/translation/Translation";
import Icon from "@modules/icon/Icon";
import LogoImage from "@img/logo.png";

export default class HeadController {
    constructor() {
        this.changeLangAttribute();
        this.translateMetas();

        // Add browser icon
        new Icon(LogoImage);
    }

    private changeLangAttribute(): void {
        const HTMLElement = document.querySelector("html");

        HTMLElement.setAttribute('lang', Translation.t('alpha') as string || Translation.locale || Translation.fallbackLocale || 'fr');
    }

    private translateMetas(): void {
        const metaDescriptionElement = document.querySelector('meta[name="description"]');
        metaDescriptionElement.setAttribute('content', Translation.t('head.metas.description') as string);
    }
}
