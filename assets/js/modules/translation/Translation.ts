import Vue from "vue";
import VueI18n, {LocaleMessages} from 'vue-i18n';
import translationsFr from "@modules/../../locales/fr-FR";
import translationsEn from "@modules/../../locales/en-EN";

// Register translations
Vue.use(VueI18n);

// @ts-ignore
const messages = {
    'fr-FR': translationsFr,
    'en-EN': translationsEn,
} as LocaleMessages;

const locale = () => {
    if (Object.keys(messages).includes(navigator.language)) {
        return navigator.language;
    }

    // @ts-ignore
    const userLanguage = navigator.userLanguage || 'fr-FR';
    if (Object.keys(messages).includes(userLanguage)) {
        return userLanguage;
    }
};

const Translation = new VueI18n({
    // @ts-ignore
    locale: locale(),
    fallbackLocale: 'fr-FR',
    messages,
});

export default Translation;
