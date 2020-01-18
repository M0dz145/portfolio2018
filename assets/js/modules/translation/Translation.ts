import Vue from "vue";
import VueI18n, {LocaleMessages} from 'vue-i18n';
import translationsFr from "@modules/../../locales/fr-FR";
import translationsEn from "@modules/../../locales/en-EN";

// Register translations
Vue.use(VueI18n);

const Translation = new VueI18n({
    // @ts-ignore
    locale: navigator.language || navigator.userLanguage || 'fr-FR',
    // @ts-ignore
    messages: {
        'fr-FR': translationsFr,
        'en-EN': translationsEn,
    } as LocaleMessages,
});

export default Translation;
