<template>
    <div id="app__container">
        <div id="background">
            <background></background>
        </div>

        <div class="layer cloud" data-position-x="13%" data-position-y="60%" data-depth="0.15">
            <img src="./../img/lowCloud4.png" alt="cloud">
        </div>

        <div class="layer cloud" data-position-x="60%" data-position-y="35%" data-depth="0.30">
            <img src="./../img/lowCloud3.png" alt="cloud">
        </div>

        <div class="layer cloud" data-position-x="20%" data-position-y="70%" data-depth="0.45">
            <img src="./../img/lowCloud2.png" alt="cloud">
        </div>

        <div class="layer cloud" data-position-x="5%" data-position-y="9%" data-depth="0.85">
            <img src="./../img/lowCloud5.png" alt="cloud">
        </div>

        <div class="layer cloud" data-position-x="87%" data-position-y="90%" data-depth="0.65">
            <img src="./../img/lowCloud2.png" alt="cloud">
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
    import AboutIsland from './components/VAboutIsland.vue'
    import ContactIsland from './components/VContactIsland.vue'
    import WorkIsland from './components/VWorkIsland.vue'
    import background from './../img/background.svg'
    import Parallax from 'parallax-js'

    export default {
        mounted() {
            let appContainer     = document.getElementById('app__container'),
                parallaxInstance = new Parallax(appContainer);

            parallaxInstance.enable();

            appContainer.style.pointerEvents = 'auto';
            [].forEach.call(document.getElementsByClassName('layer'), (layer) => {
                layer.style.top = layer.getAttribute('data-position-y') || 0
                layer.style.left = layer.getAttribute('data-position-x') || 0
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