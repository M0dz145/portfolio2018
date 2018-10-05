<script lang="ts">
    import Responsive from '@modules/responsive/Responsive';
    import VAboutIsland from '@components/about/VAboutIsland.vue';
    import VHomeMobile from '@components/home/VHomeMobile.vue';
    import VWorkIsland from '@components/works/VWorkIsland.vue';
    import VContactIsland from '@components/contact/VContactIsland.vue';
    import VImage from '@components/common/image/VImage.vue';
    import Parallax from 'parallax-js';
    import Component from 'vue-class-component';
    import Vue from 'vue';

    @Component({
        components: {
            VContactIsland,
            VAboutIsland,
            VWorkIsland,
            VImage,
            VHomeMobile
        },
        mounted(): void {
            if (!Responsive.isPhone()) {
                this.parallaxInstance = new Parallax(this.$refs.parallaxContainer, {
                    pointerEvents: true
                });
            }
        },
        data() {
            const cloud2 = require('@img/lowCloud2.png'),
                cloud3 = require('@img/lowCloud3.png'),
                cloud4 = require('@img/lowCloud4.png'),
                cloud5 = require('@img/lowCloud5.png');

            return {
                Responsive,
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
        }
    })
    export default class VHome extends Vue {
        public parallaxInstance: Parallax;
        private noIslandWasOpen: boolean = true;

        public islandClose(): void {
            this.noIslandWasOpen = true;
        }

        public islandOpen(): void {
            this.noIslandWasOpen = false;
        }

        public onBodyClick(): void {
            if (!this.noIslandWasOpen) {
                this.islandClose();
            }
        }
    }
</script>

<template>
    <VHomeMobile v-if="Responsive.isPhone()"/>

    <div v-else
         id="parallax__container"
         ref="parallaxContainer"
         :class="{'noIslandWasOpen': noIslandWasOpen}"
         @click="onBodyClick">
        <div v-for="(cloud, index) in clouds"
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
             :data-depth="0.40">
            <VWorkIsland
                    :noIslandWasOpen="noIslandWasOpen"/>
        </div>
        <div class="layer island__container island__container--about"
             :data-depth="0.70">
            <VAboutIsland
                    :noIslandWasOpen="noIslandWasOpen"
                    @islandClose="islandClose"
                    @islandOpen="islandOpen"/>
        </div>
        <div class="layer island__container island__container--contact"
             :data-depth="0.25">
            <VContactIsland
                    :noIslandWasOpen="noIslandWasOpen"
                    @islandClose="islandClose"
                    @islandOpen="islandOpen"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "Home";
</style>