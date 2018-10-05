import {VueConstructor} from 'vue';
import StringManipulation from "@modules/string/StringManipulation";
import Collection from "@modules/collection/Collection";

export default class ComponentsLoader {
    constructor(vueInstance: VueConstructor) {
        const requireComponent = require.context(
            // Le chemin relatif du dossier composants
            '@js/components',
            // Suivre ou non les sous-dossiers
            true,
            // L'expression régulière utilisée pour faire concorder les noms de fichiers de composant de base
            /[A-Z]\w+\.(ts)$/
        );

        requireComponent.keys().forEach((fileName: string) => {
            // Récupérer la configuration du composant
            const componentConfig = requireComponent(fileName);

            // Créer un composant global
            vueInstance.component(
                ComponentsLoader.getComponentName(fileName),
                // Chercher les options du composant dans `.default`, qui
                // existera si le composant a été exporté avec `export default`,
                // sinon revenez à la racine du module.
                componentConfig.default || componentConfig
            )
        });
    }

    /**
     * Récupérer le nom du composant en PascalCase
     * Enlever le début de chaine `'./` et l'extension du nom de fichier
     */
    private static getComponentName(fileName: string): string {
        const componentPath: StringManipulation = new StringManipulation(fileName.replace(/^\.\/(.*)\.\w+$/, '$1')).camelCase().upperFirst(),
            componentPaths: Array<string> = componentPath.toString().split('/');

        return new Collection(componentPaths).last() as string;
    }
}
