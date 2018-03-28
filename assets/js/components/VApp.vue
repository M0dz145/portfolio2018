<script>
    import Background from '@img/background.svg';
    import MobileDetect from '@modules/responsive/MobileDetect';
    import VBirds from '@components/VBirds';

    export default {
        data() {
            return {
                MobileDetect
            }
        },
        components: {
            Background,
            VBirds
        }
    }
</script>

<template>
    <div id="app__container">
        <Background id="background"/>

        <VBirds v-if="!MobileDetect.phone()"/>

        <div id="copyright" v-if="!MobileDetect.phone()">
            <span class="copyright__text">© chevalier-xavier.fr</span>
        </div>

        <transition mode="out-in" appear>
            <router-view/>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
    @import "~sass/components/App.scss";
</style>