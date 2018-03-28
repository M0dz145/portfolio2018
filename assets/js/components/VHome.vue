<script>
    import AboutIsland from '@components/VAboutIsland.vue';
    import ContactIsland from '@components/VContactIsland.vue';
    import WorkIsland from '@components/VWorkIsland.vue';
    import VImage from '@components/VImage';
    import MobileDetect from '@modules/responsive/MobileDetect';
    import Parallax from 'parallax-js';

    export default {
        mounted() {
            this.parallaxInstance = new Parallax(document.getElementById('parallax__container'), {
                pointerEvents: true
            });

            if(MobileDetect.phone()) {
                this.parallaxInstance.disable();
            }
        },
        data() {
            const cloud2 = require('@img/lowCloud2.png?sizes[]=100,sizes[]=200,sizes[]=400'),
                  cloud3 = require('@img/lowCloud3.png?sizes[]=100,sizes[]=200,sizes[]=400'),
                  cloud4 = require('@img/lowCloud4.png?sizes[]=100,sizes[]=200,sizes[]=400'),
                  cloud5 = require('@img/lowCloud5.png?sizes[]=100,sizes[]=200,sizes[]=400');

            return {
                MobileDetect,
                parallaxInstance: null,
                clouds: [
                    {
                        // 1
                        image: Object.assign({sizes: '110px'}, cloud4),
                        depth: 0.15
                    },
                    {
                        // 2
                        image: Object.assign({sizes: '90px'}, cloud3),
                        depth: 0.30
                    },
                    {
                        // 3
                        image: Object.assign({sizes: '175px'}, cloud2),
                        depth: 0.45
                    },
                    {
                        // 4
                        image: Object.assign({sizes: '200px'}, cloud5),
                        depth: 0.85
                    },
                    {
                        // 5
                        image: Object.assign({sizes: '75px'}, cloud2),
                        depth: 0.65
                    }
                ]
            }
        },
        components: {
            AboutIsland,
            ContactIsland,
            WorkIsland,
            VImage
        },
        beforeRouteEnter(to, from, next) {
            if(typeof this !== 'undefined') {
                this.parallaxInstance.enable();
            }

            next();
        },
        beforeRouteLeave(to, from, next) {
            this.parallaxInstance.disable();

            next();
        }
    }
</script>

<template>
    <div id="parallax__container">
        <div v-for="(cloud, index) in clouds"
             v-if="!MobileDetect.phone()"
             class="layer cloud"
             :class="`cloud-${index + 1}`"
             :data-depth="cloud.depth">
            <VImage :src="cloud.image.src"
                    :srcSet="cloud.image.srcSet"
                    :sizes="cloud.image.sizes"
                    classes="cloud__image"
                    alt="cloud">
            </VImage>
        </div>

        <div class="layer island__container island__container--work"
             :data-depth="!MobileDetect.phone() ? 0.40 : null">
            <WorkIsland/>
        </div>
        <div class="layer island__container island__container--about"
             :data-depth="!MobileDetect.phone() ? 0.70 : null">
            <AboutIsland/>
        </div>
        <div class="layer island__container island__container--contact"
             :data-depth="!MobileDetect.phone() ? 0.25 : null">
            <ContactIsland/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "~sass/components/Home.scss";
</style>