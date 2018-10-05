<script lang="ts">
    import Responsive from '@modules/responsive/Responsive';
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
            Responsive
        }),
        mounted(): void {
            window.addEventListener('resize', () => {
                if((this.actualDeviceIsPhone && !Responsive.isPhone()) || (!this.actualDeviceIsPhone && Responsive.isPhone())) {
                    location.reload();
                }
            })
        }
    })
    export default class VApp extends Vue {
        public actualDeviceIsPhone: boolean = !!Responsive.isPhone();
    }
</script>

<template>
    <div id="app__container">
        <VBackground/>

        <Birds/>

        <div id="copyright" v-if="!Responsive.isPhone()">
            <span class="copyright__text">© chevalier-xavier.fr</span>
        </div>

        <transition name="app" mode="out-in" appear>
            <router-view class="applicationTransition"/>
        </transition>

        <VCursor v-if="!Responsive.isPhone()"/>
    </div>
</template>

<style lang="scss">
    @import "App";
</style>