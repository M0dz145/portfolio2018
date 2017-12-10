<script>
    import AboutIsland from '@js/components/VAboutIsland.vue';
    import ContactIsland from '@js/components/VContactIsland.vue';
    import WorkIsland from '@js/components/VWorkIsland.vue';
    import Background from '@img/background.svg';
    import VImage from '@js/components/VImage';
    import VBirds from '@js/components/VBirds';
    import MobileDetect from '@js/components/mobileDetect/MobileDetect';
    import Parallax from 'parallax-js';

    export default {
        mounted() {
            const parallaxInstance = new Parallax(document.getElementById('app__container'), {
                pointerEvents: true
            });

            if(MobileDetect.phone()) {
                parallaxInstance.disable();
            }
        },
        data() {
            const cloud2 = require('./../img/lowCloud2.png?sizes[]=100,sizes[]=200,sizes[]=400'),
                  cloud3 = require('./../img/lowCloud3.png?sizes[]=100,sizes[]=200,sizes[]=400'),
                  cloud4 = require('./../img/lowCloud4.png?sizes[]=100,sizes[]=200,sizes[]=400'),
                  cloud5 = require('./../img/lowCloud5.png?sizes[]=100,sizes[]=200,sizes[]=400')

            return {
                MobileDetect,
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
            Background,
            VImage,
            VBirds
        }
    }
</script>

<template>
    <div id="app__container">
        <Background id="background"></Background>

        <div id="copyright" v-if="!MobileDetect.phone()">
            <span class="copyright__text">© chevalier-xavier.fr</span>
        </div>

        <VBirds v-if="!MobileDetect.phone()"></VBirds>

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
            <WorkIsland></WorkIsland>
        </div>
        <div class="layer island__container island__container--about"
             :data-depth="!MobileDetect.phone() ? 0.70 : null">
            <AboutIsland></AboutIsland>
        </div>
        <div class="layer island__container island__container--contact"
             :data-depth="!MobileDetect.phone() ? 0.25 : null">
            <ContactIsland></ContactIsland>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "../sass/mixins/mixins";

    #app__container {
        width: 100%;
        height: 100%;
    }

    #background, .layer {
        @include no-user-select()
    }

    .island__container {
        z-index: z(island);

        &.island__container--work {
            top: 45% !important; // Important to override parallax
            left: 70% !important; // Important to override parallax

            @include media('<=mobile-l') {
                top: percentage(1/3) !important; // Important to override parallax
                left: 0 !important; // Important to override parallax
                height: percentage(1/3);
                width: 100%;
                border-bottom: 1px solid rgba(0, 0, 0, .1);
            }
        }

        &.island__container--about {
            top: 63% !important; // Important to override parallax
            left: 50% !important; // Important to override parallax

            @include media('<=mobile-l') {
                top: percentage(2/3) !important; // Important to override parallax
                left: 0 !important; // Important to override parallax
                height: percentage(1/3);
                width: 100%;
            }
        }

        &.island__container--contact {
            z-index: z(birds);
            top: 24% !important; // Important to override parallax
            left: 33% !important; // Important to override parallax

            @include media('<=mobile-l') {
                top: percentage(0/3) !important; // Important to override parallax
                left: 0 !important; // Important to override parallax
                height: percentage(1/3);
                width: 100%;
                border-bottom: 1px solid rgba(0, 0, 0, .1);
            }
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

        @include media('<=mobile-l') {
            display: none !important; // Important to override parallax
        }
    }
</style>