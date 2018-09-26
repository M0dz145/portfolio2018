<script lang="ts">
    import MobileDetect from '@modules/responsive/MobileDetect';
    import Component from "vue-class-component";
    import Vue from "vue";
    import Birds from "@components/common/birds/Birds";
    import VCursor from "@components/common/cursor/VCursor";
    import VBackground from '@components/background/VBackground';

    @Component({
        components: {
            VBackground,
            Birds,
            VCursor
        },
        data: () => ({
            MobileDetect
        }),
        mounted(): void {
            window.addEventListener('resize', () => {
                if((this.actualDeviceIsPhone && !MobileDetect.phone()) || (!this.actualDeviceIsPhone && MobileDetect.phone())) {
                    location.reload();
                }
            })
        }
    })
    export default class VApp extends Vue {
        public actualDeviceIsPhone: boolean = !!MobileDetect.phone();
    }
</script>

<template>
    <div id="app__container">
        <VBackground/>

        <Birds/>

        <div id="copyright" v-if="!MobileDetect.phone()">
            <span class="copyright__text">© chevalier-xavier.fr</span>
        </div>

        <transition name="app" mode="out-in" appear>
            <router-view class="applicationTransition"/>
        </transition>

        <VCursor v-if="!MobileDetect.phone()"/>
    </div>
</template>

<style lang="scss">
    @import "App";
</style>