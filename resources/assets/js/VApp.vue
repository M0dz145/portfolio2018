<template>
    <div id="app__container">
        <div id="background">
            <background></background>
        </div>

        <div v-for="cloud in clouds" class="layer cloud"
             :data-position-x="cloud.position.x"
             :data-position-y="cloud.position.y"
             :data-depth="cloud.depth">
            <VImage :src="cloud.image.src"
                    :srcSet="cloud.image.srcSet"
                    :sizes="cloud.image.sizes"
                    alt="cloud">
            </VImage>
        </div>

        <div class="layer" data-position-x="70%" data-position-y="47%" data-depth="0.40">
            <WorkIsland></WorkIsland>
        </div>
        <div class="layer" data-position-x="50%" data-position-y="63%" data-depth="0.70">
            <AboutIsland></AboutIsland>
        </div>
        <div class="layer" data-position-x="33%" data-position-y="20%" data-depth="0.25">
            <ContactIsland></ContactIsland>
        </div>
    </div>
</template>

<script>
    import AboutIsland from './components/VAboutIsland.vue'
    import ContactIsland from './components/VContactIsland.vue'
    import WorkIsland from './components/VWorkIsland.vue'
    import background from './../img/background.svg'
    import Parallax from 'parallax-js'
    import VImage from './components/VImage'

    export default {
        mounted() {
            let appContainer     = document.getElementById('app__container'),
                parallaxInstance = new Parallax(appContainer, {
                    pointerEvents: true
                });

            parallaxInstance.enable();

            [].forEach.call(document.getElementsByClassName('layer'), (layer) => {
                layer.style.top = layer.getAttribute('data-position-y') || 0
                layer.style.left = layer.getAttribute('data-position-x') || 0
            });
        },
        data() {
            const cloud2 = require('./../img/lowCloud2.png?sizes[]=200,sizes[]=400,sizes[]=800'),
                  cloud3 = require('./../img/lowCloud4.png?sizes[]=200,sizes[]=400,sizes[]=800'),
                  cloud4 = require('./../img/lowCloud4.png?sizes[]=200,sizes[]=400,sizes[]=800'),
                  cloud5 = require('./../img/lowCloud5.png?sizes[]=200,sizes[]=400,sizes[]=800')

            return {
                clouds: [
                    {
                        image: Object.assign(cloud4, {sizes: '110px'}),
                        position: {
                            x: '13%',
                            y: '60%'
                        },
                        depth: 0.15
                    },
                    {
                        image: Object.assign(cloud3, {sizes: '90px'}),
                        position: {
                            x: '60%',
                            y: '35%'
                        },
                        depth: 0.30
                    },
                    {
                        image: Object.assign(cloud2, {sizes: '175px'}),
                        position: {
                            x: '20%',
                            y: '70%'
                        },
                        depth: 0.45
                    },
                    {
                        image: Object.assign(cloud5, {sizes: '200px'}),
                        position: {
                            x: '5%',
                            y: '9%'
                        },
                        depth: 0.85
                    },
                    {
                        image: Object.assign(cloud2, {sizes: '75px'}),
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
            background,
            VImage
        }
    }
</script>