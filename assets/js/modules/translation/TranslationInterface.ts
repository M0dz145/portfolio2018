export default interface TranslationInterface {
    alpha: string,
    head: {
        metas: {
            description: string,
        },
    },
    navigation: {
        back: string,
    },
    console: {
        welcome: string,
    },
    about: {
        title: string,
        presentation: string,
        contact: string,
    },
    contact: {
        title: string,
        punchline: string,
        contact: string,
    },
    works: {
        title: string,
        categories: {
            art: string,
            visualRework: string,
            portfolio: string,
            ecommerce: string,
            application: string,
        },
        contents: object,
    },
}
