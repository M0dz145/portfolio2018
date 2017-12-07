<script>
    import AboutIsland from './components/VAboutIsland.vue'
    import ContactIsland from './components/VContactIsland.vue'
    import WorkIsland from './components/VWorkIsland.vue'
    import Background from './../img/background.svg'
    import Parallax from 'parallax-js'
    import VImage from './components/VImage'
    import VBirds from './components/VBirds'

    export default {
        mounted() {
            const appContainer          = document.getElementById('app__container'),
                  parallaxInstance      = new Parallax(appContainer, {
                      pointerEvents: true
                  });

            parallaxInstance.enable();

            [].forEach.call(document.getElementsByClassName('layer'), (layer) => {
                layer.style.top = layer.getAttribute('data-position-y') || 0;
                layer.style.left = layer.getAttribute('data-position-x') || 0;
            });
        },
        data() {
            const cloud2 = require('./../img/lowCloud2.png?sizes[]=100,sizes[]=200,sizes[]=400'),
                  cloud3 = require('./../img/lowCloud3.png?sizes[]=100,sizes[]=200,sizes[]=400'),
                  cloud4 = require('./../img/lowCloud4.png?sizes[]=100,sizes[]=200,sizes[]=400'),
                  cloud5 = require('./../img/lowCloud5.png?sizes[]=100,sizes[]=200,sizes[]=400')

            return {
                clouds: [
                    {
                        // 1
                        image: Object.assign({sizes: '110px'}, cloud4),
                        position: {
                            x: '13%',
                            y: '60%'
                        },
                        depth: 0.15
                    },
                    {
                        // 2
                        image: Object.assign({sizes: '90px'}, cloud3),
                        position: {
                            x: '60%',
                            y: '35%'
                        },
                        depth: 0.30
                    },
                    {
                        // 3
                        image: Object.assign({sizes: '175px'}, cloud2),
                        position: {
                            x: '20%',
                            y: '70%'
                        },
                        depth: 0.45
                    },
                    {
                        // 4
                        image: Object.assign({sizes: '200px'}, cloud5),
                        position: {
                            x: '5%',
                            y: '9%'
                        },
                        depth: 0.85
                    },
                    {
                        // 5
                        image: Object.assign({sizes: '75px'}, cloud2),
                        position: {
                            x: '87%',
                            y: '90%'
                        },
                        depth: 0.65
                    }
                ]
            }
        },
        components: {
            AboutIsland,
            ContactIsland,
            WorkIsland,
            Background,
            VImage,
            VBirds
        }
    }
</script>

<template>
    <div id="app__container">
        <div id="background">
            <Background></Background>
        </div>

        <div id="copyright">
            <span class="copyright__text">© chevalier-xavier.fr</span>
        </div>

        <VBirds></VBirds>

        <div v-for="(cloud, index) in clouds"
             class="layer cloud"
             :class="`cloud-${index + 1}`"
             :data-position-x="cloud.position.x"
             :data-position-y="cloud.position.y"
             :data-depth="cloud.depth">
            <VImage :src="cloud.image.src"
                    :srcSet="cloud.image.srcSet"
                    :sizes="cloud.image.sizes"
                    classes="cloud__image"
                    alt="cloud">
            </VImage>
        </div>

        <div class="layer island__container" data-position-x="70%" data-position-y="47%" data-depth="0.40">
            <WorkIsland></WorkIsland>
        </div>
        <div class="layer island__container" data-position-x="50%" data-position-y="63%" data-depth="0.70">
            <AboutIsland></AboutIsland>
        </div>
        <div class="layer island__container island__container--bottom" data-position-x="33%" data-position-y="20%" data-depth="0.25">
            <ContactIsland></ContactIsland>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "../sass/mixins/mixins";

    #background, .layer {
        @include no-user-select()
    }

    .island__container {
        z-index: z(island);

        &.island__container--bottom {
            z-index: z(birds);
        }
    }

    #copyright {
        z-index: z(copyright);
        .copyright__text {
            position: absolute;
            top: 30px;
            left: 45px;
            min-width: 300px;
            color: rgba(0, 0, 0, 0.2);
            text-transform: uppercase;
        }
    }
</style>