<script>
    import Background from '@img/background.svg';
    import MobileDetect from '@components/mobileDetect/MobileDetect';
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
        <Background id="background"></Background>

        <VBirds v-if="!MobileDetect.phone()"></VBirds>

        <div id="copyright" v-if="!MobileDetect.phone()">
            <span class="copyright__text">© chevalier-xavier.fr</span>
        </div>

        <transition :name="transitionName" mode="out-in" appear>
            <router-view></router-view>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
    @import '../sass/mixins/mixins';

    #app__container {
        width: 100%;
        height: 100%;
    }

    #background {
        @include no-user-select();
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