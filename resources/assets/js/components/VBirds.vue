<script>
    import BirdsProvider from "./../components/birds/BirdsProvider";

    export default {
        mounted() {
            const birdsProviderInstance = new BirdsProvider(document.getElementById('birds'));
            birdsProviderInstance.init();
        }
    }
</script>

<template>
    <div id="birds"></div>
</template>

<style lang="scss" scoped>
    @import "./../../sass/mixins/mixins";

    #birds {
        z-index: z(birds);
        background: transparent radial-gradient(ellipse at center center, transparent 59%, rgba(0, 0, 0, 0.25) 100%) no-repeat scroll 0 0;
    }
</style>