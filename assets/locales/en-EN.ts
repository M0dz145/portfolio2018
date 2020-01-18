import TranslationInterface from "@modules/translation/TranslationInterface";

const translations = {
    alpha: 'en',
    head: {
        metas: {
            description: "My name is Xavier Chevalier, a young fullstack web developer. This is my portfolio.",
        },
    },
    navigation: {
        back: 'Back',
    },
    console: {
        welcome: `ヾ(-_- )ゞ I feel that you are a developer...\nIf you have any questions about the creation of this site, you can contact me at the following address contact@xavierchevalier.com`,
    },
    about: {
        title: 'About me',
        presentation: `My name is Xavier Chevalier, a young web developer of {birth} years old.
            I have been developing applications, interfaces and websites for several years now...`,
        contact: `If you have any questions or suggestions about this site and its creation you can of course
            contact me at the following address :)`,
    },
    contact: {
        title: 'Contact me',
        punchline: `A site project in mind, and you want to make it a reality?`,
        contact:  `You can contact me at the following address`,
    },
    works: {
        title: 'My projects',
        categories: {
            art: 'Art',
            visualRework: 'Visual rework',
            portfolio: 'Portfolio',
            ecommerce: 'Commercial website',
            application: 'Application website',
        },
        contents: {
            portrait: {
                title: 'Lowpoly Portrait',
                description: `My personal portrait in lowpoly created in Photoshop.`,
            },
            elkyos: {
                title: 'Elkyos',
                description: `Elkyos is an MMORPG project based on a fantastic medieval universe with a slight touch of steampunk.`,
            },
            nicolas: {
                title: 'Nicolas Chevalier',
                description: `Portfolio of Nicolas Chevalier, a young application developer, but also my older brother.
            With his ideas, and my desire for a clear/pure design, I was able to develop the graphic aspect of the site.`,
            },
            immobilis: {
                title: 'Immobilis',
                description: `Immobilis is a project designed by 3 people in the school year of high school.
            This site lists all real estate ads previously created by apartment / house owners.`,
            },
            lion: {
                title: 'Lowpoly Lion',
                description: `A lion in lowpoly created in Photoshop.`,
            },
            deer1: {
                title: 'Deer',
                description: `Unfinished drawing of a deer on a hill, hand drawn.`,
            },
            deer2: {
                title: 'Deer',
                description: `Drawing of a deer, hand drawn.`,
            },
            eye: {
                title: 'Eye',
                description: `Hand drawn.`,
            },
            berrybanks: {
                title: 'Berry Banks',
                description: `Berry Banks is a tool that allows you to easily manage your bank
            accounts thanks to numerous features and statistics that provide a broad overview of your expenses and savings.`,
            },
            fox: {
                title: 'Fox',
                description: `Digital painting of a fox on Photoshop.`,
            },
            deer3: {
                title: 'Deer',
                description: ``,
            },
            deer4: {
                title: 'Deer',
                description: ``,
            },
        },
    },
} as TranslationInterface;

export default translations;

