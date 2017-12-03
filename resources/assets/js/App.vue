<template>
    <div id="app__container">
        <div>
            <background></background>
        </div>
        <div class="layer" data-position-x="50%" data-position-y="63%" data-depth="0.70">
            <AboutIsland></AboutIsland>
        </div>
        <div class="layer" data-position-x="70%" data-position-y="47%" data-depth="0.70">
            <WorkIsland></WorkIsland>
        </div>
        <div class="layer" data-position-x="33%" data-position-y="20%" data-depth="0.70">
            <ContactIsland></ContactIsland>
        </div>
    </div>
</template>

<script>
    import AboutIsland from './components/AboutIsland.vue'
    import ContactIsland from './components/ContactIsland.vue'
    import WorkIsland from './components/WorkIsland.vue'
    import background from './../img/background.svg'
    import Parallax from 'parallax-js'

    export default {
        mounted() {
            let appContainer = document.getElementById('app__container');
            new Parallax(appContainer);

            appContainer.style.pointerEvents = 'auto';
            [].forEach.call(document.getElementsByClassName('layer'), (layer) => {
                layer.style.top = layer.getAttribute('data-position-y')
                layer.style.left = layer.getAttribute('data-position-x')
            });
        },
        components: {
            AboutIsland,
            ContactIsland,
            WorkIsland,
            background
        }
    }
</script>

<style lang="scss">
    #app__container {
    }
</style>