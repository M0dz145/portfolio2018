import Work from "@modules/work/Work";
import Translation from "@modules/translation/Translation";

export default [
    new Work(
        Translation.t('works.contents.portrait.title') as string,
        Translation.t('works.categories.art') as string,
        Translation.t('works.contents.portrait.description') as string,
        require('@img/works/paint/lowpoly_me.jpg?placeholder=true&sizes[]=200,sizes[]=1200')
    ),
    new Work(
        Translation.t('works.contents.elkyos.title') as string,
        Translation.t('works.categories.visualRework') as string,
        Translation.t('works.contents.elkyos.description') as string,
        require('@img/works/elkyos2.jpg?placeholder=true&sizes[]=200,sizes[]=1200')
    ),
    new Work(
        Translation.t('works.contents.nicolas.title') as string,
        Translation.t('works.categories.portfolio') as string,
        Translation.t('works.contents.nicolas.description') as string,
        require('@img/works/nicolasChevalier2.jpg?placeholder=true&sizes[]=200,sizes[]=1200')
    ),
    new Work(
        Translation.t('works.contents.immobilis.title') as string,
        Translation.t('works.categories.ecommerce') as string,
        Translation.t('works.contents.immobilis.description') as string,
        require('@img/works/immobilis2.jpg?placeholder=true&sizes[]=200,sizes[]=1200')
    ),
    new Work(
        Translation.t('works.contents.lion.title') as string,
        Translation.t('works.categories.art') as string,
        Translation.t('works.contents.lion.description') as string,
        require('@img/works/paint/lowpoly_lion.jpg?placeholder=true&sizes[]=200,sizes[]=1200')
    ),
    new Work(
        Translation.t('works.contents.deer1.title') as string,
        Translation.t('works.categories.art') as string,
        Translation.t('works.contents.deer1.description') as string,
        require('@img/works/paint/cerf1.jpg?placeholder=true&sizes[]=200,sizes[]=1200')
    ),
    new Work(
        Translation.t('works.contents.deer2.title') as string,
        Translation.t('works.categories.art') as string,
        Translation.t('works.contents.deer2.description') as string,
        require('@img/works/paint/cerf2.jpg?placeholder=true&sizes[]=200,sizes[]=1200')
    ),
    new Work(
        Translation.t('works.contents.eye.title') as string,
        Translation.t('works.categories.art') as string,
        Translation.t('works.contents.eye.description') as string,
        require('@img/works/paint/eye.jpg?placeholder=true&sizes[]=200,sizes[]=1200')
    ),
    new Work(
        Translation.t('works.contents.berrybanks.title') as string,
        Translation.t('works.categories.application') as string,
        Translation.t('works.contents.berrybanks.description') as string,
        require('@img/works/berry-banks.png')
    ),
    new Work(
        Translation.t('works.contents.fox.title') as string,
        Translation.t('works.categories.art') as string,
        Translation.t('works.contents.fox.description') as string,
        require('@img/works/paint/fox.jpg?placeholder=true&sizes[]=200,sizes[]=1200')
    ),
    new Work(
        Translation.t('works.contents.deer3.title') as string,
        Translation.t('works.categories.art') as string,
        Translation.t('works.contents.deer3.description') as string,
        require('@img/works/paint/cerf3.jpg?placeholder=true&sizes[]=200,sizes[]=1200')
    ),
    new Work(
        Translation.t('works.contents.deer4.title') as string,
        Translation.t('works.categories.art') as string,
        Translation.t('works.contents.deer4.description') as string,
        require('@img/works/paint/cerf4.jpg?placeholder=true&sizes[]=200,sizes[]=1200')
    ),
];
