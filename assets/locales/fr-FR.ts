import TranslationInterface from "@modules/translation/TranslationInterface";

const translations = {
    alpha: 'fr',
    head: {
        metas: {
            description: "Je m'appelle Xavier Chevalier, jeune développeur Web Full-Stack. Ceci est mon portfolio.",
        },
    },
    navigation: {
        back: 'Retour',
    },
    console: {
        welcome: `ヾ(-_- )ゞ Je sens que vous êtes un développeur...\nSi vous avez des questions sur la création de ce site, vous pouvez me contacter à l'adresse suivante contact@xavierchevalier.com`,
    },
    about: {
        title: 'A propos',
        presentation: `Je m'appelle Xavier Chevalier, jeune développeur Web de {birth} ans.
            Je développe des applications, interfaces et site Web depuis plusieurs années...`,
        contact: `Si vous avez des questions ou des suggestions concernant ce site et sa création
            vous pouvez bien évidemment me contacter à l'adresse suivante :)`,
    },
    contact: {
        title: 'Contactez-moi',
        punchline: `Un projet de site en tête et vous souhaitez le réaliser ?`,
        contact:  `Contactez-moi à l'adresse suivante`,
    },
    works: {
        title: 'Mes projets',
        categories: {
            art: 'Art',
            visualRework: 'Refonte graphique',
            portfolio: 'Portfolio',
            ecommerce: 'ECommerce',
            application: 'Application Web',
        },
        contents: {
            portrait: {
                title: 'Portrait en lowpoly',
                description: `Mon portrait personnel en lowpoly construit sous Photoshop.`,
            },
            elkyos: {
                title: 'Elkyos',
                description: `Elkyos est un projet de MMORPG basé sur un univers médiéval fantastique avec une légère touche de steampunk.`,
            },
            nicolas: {
                title: 'Nicolas Chevalier',
                description: `Portfolio de Nicolas Chevalier, un jeune développeur d'applications, mais aussi mon frère aîné.
            Avec ses idées, et mon désir d'un design clair et épuré, j'ai pu développer l'aspect graphique du site.`,
            },
            immobilis: {
                title: 'Immobilis',
                description: `Immobilis est un projet conçu par 3 personnes pendant l'année scolaire du lycée.
            Ce site répertorie toutes les annonces immobilières précédemment créées par des propriétaires d'appartements et de maisons.`,
            },
            lion: {
                title: 'Lion en lowpoly',
                description: `Un lion en lowpoly créé dans Photoshop.`,
            },
            deer1: {
                title: 'Cerf',
                description: `Dessin inachevé d'un cerf sur une colline, dessiné à la main.`,
            },
            deer2: {
                title: 'Cerf',
                description: `Dessin d'un cerf, dessiné à la main.`,
            },
            eye: {
                title: 'Oeil',
                description: `Dessiné à la main.`,
            },
            berrybanks: {
                title: 'Berry Banks',
                description: `Berry Banks est un outil qui vous permet de gérer facilement votre banque
            grâce à de nombreuses fonctionnalités et statistiques qui permettent d'avoir une vision globale de vos dépenses et de vos économies.`,
            },
            fox: {
                title: 'Renard',
                description: `Peinture numérique d'un renard sur Photoshop.`,
            },
            deer3: {
                title: 'Cerf',
                description: ``,
            },
            deer4: {
                title: 'Cerf',
                description: ``,
            },
        },
    },
} as TranslationInterface;

export default translations;
