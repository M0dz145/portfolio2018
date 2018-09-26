<script lang="ts">
    import VImage from '@components/common/image/VImage';
    import Component from "vue-class-component";
    import Vue from 'vue';
    import MobileDetect from "../../modules/responsive/MobileDetect";

    @Component({
        props: {
            title: String,
            category: String,
            description: String,
            image: Object,
            fullscreen: Boolean
        },
        components: {
            VImage
        },
        mounted(): void {
            this.buildBackgroundImages();

            document.addEventListener('mousemove', (event: MouseEvent) => {
                if (!MobileDetect.phone()) {
                    if (this.fullscreen) {
                        let backgroundPositionX = ((event.clientX - this.$refs.work.offsetLeft) / this.$refs.work.offsetWidth) * 100,
                            backgroundPositionY = ((event.clientY - this.$refs.work.offsetTop) / this.$refs.work.offsetHeight) * 100;

                        if (backgroundPositionX > 100) {
                            backgroundPositionX = 100;
                        } else if (backgroundPositionX < 0) {
                            backgroundPositionX = 0
                        }

                        if (backgroundPositionY > 100) {
                            backgroundPositionY = 100;
                        } else if (backgroundPositionY < 0) {
                            backgroundPositionY = 0
                        }

                        this.$refs.work.style.backgroundPositionX = `${backgroundPositionX}%`;
                        this.$refs.work.style.backgroundPositionY = `${backgroundPositionY}%`;
                    } else {
                        if (typeof this.$refs.work === 'object') {
                            this.$refs.work.style.backgroundPositionX = this.$refs.work.style.backgroundPositionY = 'center';
                        }
                    }
                }
            });
        }
    })
    export default class VWork extends Vue {
        public backgroundImage: string = '';
        public readonly MobileDetect: MobileDetect = MobileDetect;

        public buildBackgroundImages(): void {
            // noinspection TypeScriptUnresolvedVariable
            const images = this.$props.image.images.slice(0);
            images.reverse().forEach((image, index) => {
                if (index > 0) {
                    this.backgroundImage += `, `;
                }

                this.backgroundImage += `url(${image.path})`;
            });
        }
    }
</script>

<template>
    <div ref="work"
         class="work"
         :class="{
            'work--fullscreen': fullscreen
         }"
         :style="{backgroundImage}">
        <div class="workOverlay">
            <div class="work__overlay">
                <span class="work__text">
                    <span v-if="!(fullscreen && MobileDetect.phone()) || (fullscreen && !description)" class="work__textCategory">{{ category }}</span>
                    <span v-if="fullscreen" class="work__textDescription"> {{ description }}</span>
                </span>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "Work";
</style>