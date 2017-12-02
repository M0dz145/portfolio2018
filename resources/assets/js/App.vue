<template>
    <div id="app__container">
        <div class="layer" data-depth="0.70">
            <AboutIsland></AboutIsland>
        </div>
        <div class="layer" data-depth="0.70">
            <ContactIsland></ContactIsland>
        </div>
        <div class="layer" data-depth="0.70">
            <WorkIsland></WorkIsland>
        </div>
    </div>
</template>

<script>
    import AboutIsland from './components/AboutIsland.vue'
    import ContactIsland from './components/ContactIsland.vue'
    import WorkIsland from './components/WorkIsland.vue'

    export default {
        components: {
            AboutIsland,
            ContactIsland,
            WorkIsland
        }
    }
</script>

<style lang="scss">
    #app__container {
        background: url('../img/background.png') no-repeat center;
        background-size: cover;
    }
</style>