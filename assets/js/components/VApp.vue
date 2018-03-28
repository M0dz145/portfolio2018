<script>
    import Background from '@img/background.svg';
    import MobileDetect from '@modules/responsive/MobileDetect';
    import VBirds from '@components/VBirds';

    export default {
        data() {
            return {
                transitionName: 'router-transition',
                MobileDetect
            }
        },
        components: {
            Background,
            VBirds
        },
        beforeRouteUpdate(to, from, next) {
            if(from.name === 'works' && to.name === 'home') {
                return this.transitionName = from.name;
            }

            this.transitionName = to.name || 'router-transition';

            next();
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

        <transition :name="transitionName" mode="out-in" appear>
            <router-view/>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
    @import "~sass/components/App.scss";
</style>